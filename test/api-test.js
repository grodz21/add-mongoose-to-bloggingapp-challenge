const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();


chai.use(chaiHttp);



describe('blogpost', function(){

	var idPostToDelete =


	before(function(){
		return runServer();
	});

	after(function(){
		return closeServer();
	});


	it('should create blog post on POST', function(){
		const newBlogPost = {
			author: 'NewAuthor123', title: 'This is a new title', content: 'This is a new post test'};

		return chai.request(app)
			.post('/blogposts')
			.send(newBlogPost)
			.then(function(res) {
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.include.keys('author','title','content');
			});
	});


	it('should retrieve blog post on GET', function(){
		return chai.request(app)
			.get('/blogposts')
			.then(function(res) {

				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');

				res.body.should.have.length.of.at.least(1);



				// each item should be an object with key/value pairs
        		// for `id`, `name` and `ingredients`.

        		res.body.forEach(function(post){
        			post.should.be.a('object');
        			post.should.include.keys('author', 'title','content');
        		});
			});

	});



	it('should update blog post on PUT', function(){
		const updateData = {
			author: 'foo',
			title: 'bizz bang',
			content: 'This is an updated content',
		};

		return chai.request(app)
			.get('/blogposts')
			.then(function(res) {
				updateData.id = res.body[0]._id;
				console.log(res.body);
				return chai.request(app)
					.put(`/blogposts/${res.body[0]._id}`)
					.send(updateData)
			})

			.then(function(res) {
				res.should.have.status(204);
			});

	});




	it('should delete blog post on DELETE', function() { 

		return chai.request(app)

			.get('/blogposts')
			.then(function(res){
				return chai.request(app)
					.delete(`/blogposts/${res.body[0]._id}`)
			})

			.then(function(res) {
				res.should.have.status(204);
				
			});




		// const postId = 

		// return chai.request(app)
		// 	.delete('/blogposts')
		// 	.then(function(res) {
		// 		res.body.should.have.id;

		// 	});

	});

});	