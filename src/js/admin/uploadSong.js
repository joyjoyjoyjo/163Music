{
    let view = {
        el: `.uploadArea`,
        find(selector){
            return $(this.el).find(selector)[0]
        }
    }
    let model = {
    }

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.initQiniu()
        },
        initQiniu() {
            //引入Plupload 、qiniu.js后
            var uploader = Qiniu.uploader({
                runtimes: 'html5',    //上传模式,依次退化
                browse_button: this.view.find('#upload'),       //上传选择的点选按钮，**必需**
                uptoken_url: 'http://localhost:8888/uptoken', //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
                // unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
                // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
                domain: 'http://pn3pg7g8p.bkt.clouddn.com',   //bucket 域名，下载资源时用到，**必需**
                get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
                container: this.view.find('#draggable'),           //上传区域DOM ID，默认是browser_button的父元素，
                max_file_size: '20mb',           //最大文件体积限制
                dragdrop: true,                   //开启可拖曳上传
                drop_element: 'upload',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                init: {
                    'FilesAdded': function (up, files) {
                        plupload.each(files, function (file) {
                            // 文件添加进队列后,处理相关的事情
                        });
                    },
                    'BeforeUpload': function (up, file) {
                        window.eventHub.emit('BeforeUploading')
                    },
                    'UploadProgress': function (up, file) {
                    },
                    'FileUploaded': function (up, file, info) {
                        window.eventHub.emit('AfterUpload')
                        var domain = up.getOption('domain');
                        var res = JSON.parse(info.response);
                        var sourceLink = 'http://' + domain + '/' + encodeURIComponent(res.key);
                        window.eventHub.emit('new',{
                            url:sourceLink,
                            name:res.key
                        })
                    },
                    'Error': function (up, err, errTip) {
                        //上传出错时,处理相关的事情
                    },
                    'UploadComplete': function () {
                        //队列文件处理完毕后,处理相关的事情
                    }
                }
            });
        }
    }
    controller.init(view,model)
}