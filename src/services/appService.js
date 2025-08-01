
export default {
    smoothEnter: function (id) {
        let el = document.getElementById(id);
        el.style.height = '0';
        el.style.transition = 'height 0.3s ease';
        const scrollHeight = el.scrollHeight + 'px';
        requestAnimationFrame(() => {
            el.style.height = scrollHeight;
        })
    },

    smoothLeave: function smoothLeave(id) {
        let el = document.getElementById(id);

        el.style.height = el.scrollHeight + 'px';
        el.style.transition = 'height 0.3s ease';
        requestAnimationFrame(() => {
            el.style.height = '0';
        });
    }
}