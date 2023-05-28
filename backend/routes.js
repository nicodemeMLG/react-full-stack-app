import { run, insertPost, updatePost, deletePost } from './handlers';

module.exports = (routes) => {
    routes.get('/', async (_, res) => {
        //await client.connect();
        //const mesclients= await client.db('blog').collection('posts').find();
        //console.log(mesclients);
        //res.send(mesclients);
        run(res).catch(console.dir);
        
         
    })
    
    routes.post('/insert', (req, res) => {
        insertPost(req,res);
    })
    
    routes.put('/update', (req, res) => {
        updatePost(res);
    })
    routes.delete('/delete', (req, res) => {
        deletePost(res);
    })
    
}
