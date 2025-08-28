<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end">
            <button class="btn btn-lg btn-success" type="button">
                {{ $t('buttons.copy') }}
            </button>
            <button class="btn btn-lg btn-danger" type="button">
                {{ $t('buttons.cancel') }}
            </button>

        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="mb-5">{{ $t('label.group_data_copy') }}</h3>
            </div>
            <div class="col-md-8">
                <div class="d-flex align-items-center justify-content-between">
                    <label for="">{{ $t('label.file_storage_location') }}</label>
                    <label for="">{{ $t('FTP') }}</label>
                </div>
                <select name="ftp" id="ftp" class="form-control">
                    <option value="Backeup">C:\AL Yassen Backup\</option>
                </select>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-md-6">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="file_name" class="form-label">{{ $t('label.file_name') }}</label>

                        <input type="text" id="file_name" class="form-control rounded-1" />

                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="password" class="form-label">{{ $t('label.password') }}</label>

                        <input type="password" id="password" class="form-control rounded-1" />

                    </div>
                </div>

            </div>
        </div>



    </div>
</template>

<script>

export default {
    name: "GroupDataCopyComponent",
    data() {

        return {

        };

    }
}

</script>

<style></style>