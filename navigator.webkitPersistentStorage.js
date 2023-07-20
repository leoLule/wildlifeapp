navigator.webkitPersistentStorage.requestQuota(10 * 1024 * 1024, function (grantedBytes) {
    window.webkitRequestFileSystem(window.PERSISTENT, grantedBytes, function (fs) {
        console.log(12345);
        fs.root.getFile(filename, { create: true }, function (fileEntry) {
            fileEntry.createWriter((fileWriter) => {
                fileWriter.write(file)
            })
        })
    })
})