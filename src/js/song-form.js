
{
    let view = {
        el: '.page > main',
        init(){
            this.$el = $(this.el)
        },
        template: `
        <div class="line"></div>
        <form class="form">
            <div class="row">
                <label>Song title :</label>    
                <input name="name" type="text" value="__name__"></div>
            <div class="row">
                <label>Singer :</label>
                <input name="singer" type="text" value="__singer__"></div>
            <div class="row">
                <label>Link :</label>
                <input name="url" type="text" value="__url__"></div>
            <div class="row">
                <button type="submit">Save</button></div> 
            </div>
        </form>
        `,
        render(data = {}) {
            let placeholders = ['name', 'url','singer','id']
            let html = this.template
            placeholders.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '')
            })
            $(this.el).html(html)
            if(data.id){
                $(this.el).prepend(`<h1>EDIT FILE</h1>`)
            }else{$(this.el).prepend(`<h1>NEW FILE</h1>`)}
        },
        reset(){
            this.render({})
        }
    }
    let model = {
        data: {
            name: '', singer: '', url: '', id: ''
        },
        create(data) {
            // 声明类型
            var Song = AV.Object.extend('Song');
            // 新建对象
            var song= new Song();
            // 设置名称
            song.set('name', data.name);
            song.set('singer', data.singer);
            song.set('url', data.url);
            return song.save().then( (newSong)=> {
                let {id , attributes} = newSong
                this.data ={id,...attributes}
            }, function (error) {
                console.error(error);
            });
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.view.init()
            this.model = model
            this.view.render(this.model.data)
            this.bindEvents()
            window.eventHub.on('select',(data)=>{
                this.model.data = data
                this.view.render(this.model.data)
            })
            window.eventHub.on('new',(data)=>{
                if(this.model.data.id){
                    this.model.data={
                        name:'',url:'',id:'',singer:''
                    }
                }else{
                    Object.assign(this.model.data,data)
                }              
                this.view.render(this.model.data)
            })
        },
        bindEvents() {
            this.view.$el.on('submit', 'form', (e)=>{
                e.preventDefault()
                let needs = 'name singer url'.split(' ')
                let data = {}
                needs.map((string)=>{
                    data[string] = this.view.$el.find(`[name="${string}"]`).val()})
                    this.model.create(data).then(()=>{
                    this.view.reset()
                    window.eventHub.emit('create',this.model.data)
                })
            })
        }
    }
    controller.init(view, model)
}
