{
    let view = {
        el:'.page-1',
        init(){
            this.$el = $(this.el)
        },
        show(){
            this.$el.addClass('active')
        },
        hidden(){
            this.$el.removeClass('active')
        }
    }
    let model = {}
    let controller={
        init(view,model){
            this.view = view
            this.view.init()
            this.model = model
            this.bindEvents()
        },
        bindEvents(){
            window.eventHub.on('selectTAB',(tab)=>{
                if(tab==='page-1'){
                    this.view.show()
                }else{
                    this.view.hidden()
                }
            })
        }
    }
    controller.init(view,model)
}