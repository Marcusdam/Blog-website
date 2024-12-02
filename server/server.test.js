const request = require('supertest');
const app = require('./index');


describe('POST /api/post', () => {
    it('should create a new Post', async () => {
      const NewPost = {
        title: 'Test Post from jest4',
        content: 'This is a test post from jest4',
        categoryId: 1,
        authorId: 6
      };
  
      const response = await request(app)
        .post('/api/post')  
        .send(NewPost)
        .set('Content-Type', 'application/json');
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', NewPost.title);
      expect(response.body).toHaveProperty('content', NewPost.content);
      expect(response.body).toHaveProperty('categoryId', NewPost.categoryId);
      expect(response.body).toHaveProperty('authorId', NewPost.authorId);
    });
  });



  
  describe('GET /api/posts', () => {
    it('should return a list of posts', async () => {
      const response = await request(app).get('/api/posts');  
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
  



describe('PUT /api/post/:id', () =>{
    it('should update post', async()=>{
        const postId = 56
        const NewPost = {
            title: 'Test Post from jest44',
            content: 'This is a test post from jest44',
            categoryId: 1,
            authorId: 6
          };
        const response = await request(app).put(`/api/post/${postId}`).send(NewPost).set('Content-Type', 'application/json');
        expect(response.status).toBe(200)
       
    })
    it('should return 404 if the post is not found', async () =>{
        const postId = 111
        const response = await request(app).put(`/api/post/${postId}`);
        expect(response.status).toBe(404)
    })
});

describe('DELETE /api/post/:id', ()=>{
    it('should delete post', async ()=>{
        const postId = 58
        const response = await request(app).delete(`/api/post/${postId}`);
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('Message', 'Post deleted successfully');

    })

    it('should return 404 if the post is not found', async ()=>{
        const postId = 1888
        const response = await request(app).delete(`/api/post/${postId}`);
        expect(response.status).toBe(404);
        
    })
})