import express from "express";

let posts = [];
let postIdentifier = 1;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.get("/", (req, res) => {
  console.log(posts);
  res.render("index.ejs", { posts });
});

app.get("/new", (req, res) => {
  //New post submission logic will go here
  res.render("new.ejs");
});

app.post("/create", (req, res) => {
  const { title, content } = req.body;

  if (!title.trim() || !content.trim()) {
    return res.redirect("/");
  }

  posts.push({
    id: postIdentifier++,
    title,
    content,
  });

  console.log("New Post Submitted:");
  console.log("Title:", title);
  console.log("Content:", content);

  res.redirect("/");
});


app.get("/edit/:id", (req,res) => { 
   console.log(posts);
  res.render("edit.ejs", { post: posts.find(post => post.id === parseInt(req.params.id)) });
 
})

app.post("/edit/:id", (req,res) => {
  const { title, content } = req.body;
  const post = posts.find(post => post.id === parseInt(req.params.id));
  if (post) {
    post.title = title;
    post.content = content;
    res.redirect("/");
  } else {
    res.status(404).send("Post not found");
  }
});


app.post( "/delete", (req,res)=>{
  const { id } = req.body;
  posts = posts.filter(post => post.id !== parseInt(id));
  res.redirect("/");
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
