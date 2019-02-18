
{
    let view = {
        el:`.page > main`,
        template:`
        <h1>NEW FILE</h1>
        <div class="line"></div>
        <form class="form">
            <div class="row">
                <label>Song title :</label>    
                <input type="text"></div>
            <div class="row">
                <label>Singer :</label>
                <input type="text"></div>
            <div class="row">
                <label>Link :</label>
                <input type="text"></div>
            <div class="row">
                <button type="submit">Save</button></div> 
            </div>
        </form>
        `,
        render(data){
            $(this.el).html(this.template)
        }
    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
        }
    }
    controller.init(view,model)    
}
