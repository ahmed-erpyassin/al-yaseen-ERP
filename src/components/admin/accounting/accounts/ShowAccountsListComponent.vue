<template>
    <div class="container pe-5 ps-5" v-if="isAuthenticated">
        <h1><i class="bi bi-file-text"></i> {{ account?.name || 'تفاصيل الحساب' }}</h1>

        <div class="mt-4">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <th>{{ $t('label.account_number') }}:</th>
                        <td>{{ account?.number }}</td>
                        <th>{{ $t('label.account_name') }}:</th>
                        <td>{{ account?.name }}</td>
                    </tr>
                    <tr>
                        <th>{{ $t('label.account_balance') }}:</th>
                        <td>{{ account?.balance }}</td>
                        <th>{{ $t('label.account_balance_currency') }}:</th>
                        <td>{{ account?.currency }}</td>
                    </tr>
                    <tr>
                        <th>{{ $t('label.account_level') }}:</th>
                        <td>{{ account?.level }}</td>
                        <th>{{ $t('label.account_type') }}:</th>
                        <td>{{ account?.type }}</td>
                    </tr>
                    <tr>
                        <th>{{ $t('label.account_classification') }}:</th>
                        <td>{{ account?.classification }}</td>
                        <th>{{ $t('label.report_type') }}:</th>
                        <td>{{ account?.report_type }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mt-3">
            <router-link :to="{ name: 'admin.accounting.accounts.index' }" class="btn btn-secondary">
                {{ $t('buttons.back') }}
            </router-link>
        </div>
    </div>

    <div v-else class="text-center mt-5">
        <p>يرجى تسجيل الدخول للوصول إلى الحسابات.</p>
        <router-link :to="{ name: 'auth.login' }" class="btn btn-primary mt-3">تسجيل الدخول</router-link>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: "ShowAccountsListComponent",
    data() {
        return {
            baseUrl: process.env.VUE_APP_API_BASE_URL,
            account: null
        };
    },
    computed: {
        isAuthenticated() {
            return !!localStorage.getItem('authToken');
        }
    },
    methods: {
        async fetchAccount() {
            const id = this.$route.params.id;
            if (!id) return;

            try {
                const token = localStorage.getItem('authToken');
                const res = await axios.get(`${this.baseUrl}/accounts/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Accept-Language': 'ar'
                    }
                });
                this.account = res.data.data || res.data;
            } catch (err) {
                console.error(err);
                Swal.fire('خطأ', 'تعذر تحميل بيانات الحساب', 'error');
            }
        }
    },
    mounted() {
        if (this.isAuthenticated) {
            this.fetchAccount();
        }
    }
};
</script>

<style scoped>
table th {
    background-color: #f4f4f4;
    width: 25%;
}

table td {
    width: 25%;
}
</style>
