window.blazorInterop = {
    showModal: function (dialogId) {
        window.alert('see after this the page title'+dialogId);
        return true;
    },
    setPageTitle: function(title) {
        document.title = title;
    },    
};