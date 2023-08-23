require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");
const path = require('path');

const homeStartingContent = "In this rapidly evolving digital era, the profound impact of Artificial Intelligence (AI) is becoming increasingly evident across diverse fields and industries. From self-driving cars to smart virtual assistants and cutting-edge medical diagnostics, AI is revolutionizing the way we live, work, and interact with technology. In my blog posts, we delve into the exciting world of AI and explore how this transformative technology is reshaping our future. Join me on this journey as we uncover the potential of AI, its ethical considerations, and the fascinating possibilities it holds for humanity. Discover the captivating innovations that AI brings to the table, as well as the challenges we must address to harness its full potential responsibly. Whether you're a tech enthusiast, entrepreneur, or curious mind, these blogs will provide valuable insights into the incredible possibilities that lie ahead in our AI-driven world. Embrace the future with me as we navigate the dynamic landscape of Artificial Intelligence and unlock its boundless opportunities.";
const aboutContent = "Welcome to Blogation, a passionate endeavor born out of the desire to share knowledge, insights, and inspiration with a global community of curious minds. This blog was created with a singular vision: to serve as a creative platform where we can explore diverse topics, ranging from the wonders of technology to the complexities of human experiences. Driven by a team of dedicated writers, tech enthusiasts, and lifelong learners, Blogation seeks to foster an environment of discovery and growth. We aim to ignite curiosity, spark meaningful conversations, and empower individuals to embark on their own journeys of learning and self-improvement. At Blogation, we believe in the transformative power of knowledge and its ability to transcend borders, cultures, and backgrounds. Our eclectic blend of articles, ranging from tech innovations and AI breakthroughs to personal development and lifestyle tips, is designed to cater to the inquisitive minds of our readers. We invite you to join us on this enriching voyage as we navigate the vast seas of information and insight, driven by the conviction that knowledge shared is knowledge multiplied. Blogation was founded with a clear mission - to make a positive impact on the lives of our readers. We are committed to delivering well-researched, thought-provoking content that not only informs but also inspires and empowers. Our goal is to be a reliable source of information and a trusted companion in your quest for knowledge. In an ever-changing world where information overload can be overwhelming, we strive to present content that is both comprehensive and approachable. Whether you are a tech enthusiast looking to stay updated on the latest innovations or an individual seeking personal growth and self-improvement, our diverse range of articles caters to a wide array of interests. As a community-driven platform, we value the feedback and engagement of our readers, and we encourage you to actively participate in discussions, share your thoughts, and suggest topics you'd like us to explore. Together, we can create a vibrant and inclusive space where knowledge is shared, curiosity is nurtured, and collective growth becomes a reality. Join us on this enriching journey as we uncover the wonders of the world, embrace diverse perspectives, and celebrate the beauty of continuous learning. Together, let's explore the boundless horizons of knowledge and forge connections that transcend the digital realm. Welcome to Blogation - your window to a world of discovery and endless possibilities.";
const contactContent = "We value your feedback and are eager to hear from you! Our 'Contact Us' page is designed to provide you with a seamless way to connect with us. Whether you have questions, suggestions, or just want to say hello, we're here to listen and respond. Feel free to reach out to us using the simple form below, and we'll get back to you as soon as possible. Your thoughts and opinions matter to us, and we're committed to ensuring your experience with us is exceptional. Thank you for taking the time to get in touch – we look forward to hearing from you!";

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URI);

const postSchema = {
  title: String,
  content: String,
  date: {type: Date, default: Date.now}
};

const Post = mongoose.model("Post", postSchema);

const startingTimeStamp = Date.now();
const startingDate = new Date(startingTimeStamp);

const formattedDate = startingDate.toLocaleDateString('en-US', {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric"
});

const post1 = new Post({
  title: "AI in Everyday Life: Empowering the Future",
  content: "In today's fast-paced world, the realm of Artificial Intelligence (AI) is transforming the way we experience everyday life. From voice-activated virtual assistants streamlining our daily tasks to personalized product recommendations that seem to know us better than we know ourselves, AI has seamlessly integrated into our routines, making life more efficient and enjoyable. In my latest blog post, 'AI in Everyday Life: Empowering the Future,' we explore the incredible ways AI is revolutionizing industries like healthcare, finance, and education, and how it's creating a profound impact on society as a whole. Join me as we embark on an exciting journey through the wonders of AI, unraveling its potential to empower the future and inspire innovation in ways we never thought possible. Discover how this groundbreaking technology is not just a glimpse of tomorrow, but a present reality that holds endless possibilities for humanity's progress. Let's delve into the captivating world of AI and uncover the remarkable strides it's making to shape the world we live in today and the one we envision for tomorrow."
});

const post2 = new Post({
  title: "The Ethical Dimensions of Artificial Intelligence: Navigating the Path Ahead",
  content: "As we witness the exponential growth of Artificial Intelligence (AI) technologies, it's crucial to address the ethical implications that accompany this powerful tool. In our latest blog post, 'The Ethical Dimensions of Artificial Intelligence: Navigating the Path Ahead,' we delve into the complex interplay between AI and ethics. AI has the potential to revolutionize industries, improve lives, and foster innovation, but it also raises profound questions about privacy, bias, and accountability. Join us as we explore the ethical challenges of AI, such as the responsible use of AI in decision-making systems, the need for transparent algorithms, and the preservation of data privacy. Discover how AI can inadvertently perpetuate biases present in the data it learns from and how we can work towards mitigating these biases to create a fairer and more inclusive future. In this thought-provoking blog post, we engage in discussions surrounding the moral responsibility of developers, policymakers, and society as a whole to ensure AI is utilized ethically and for the greater good. We examine the importance of creating AI technologies that prioritize human values, adhere to rigorous standards, and put the well-being of individuals at the forefront. With AI poised to shape the trajectory of humanity, the time is ripe to reflect on the ethical framework we establish for its deployment. Join us on this journey of introspection and exploration, as we navigate the path ahead, endeavoring to strike a harmonious balance between technological advancement and ethical considerations. Together, let's shape an AI-powered future that upholds the highest standards of integrity, accountability, and empathy for the benefit of all."
});

const post3 = new Post({
  title: "AI and Healthcare: Pioneering a Revolution in Patient Care",
  content: "In the ever-evolving landscape of healthcare, Artificial Intelligence (AI) is proving to be a game-changer, revolutionizing patient care in ways that were once deemed unimaginable. In our latest blog post, 'AI and Healthcare: Pioneering a Revolution in Patient Care,' we explore the transformative impact of AI technologies in the medical field. AI-powered applications are increasingly being used to assist medical professionals in diagnosis, treatment planning, and even drug discovery. With the ability to analyze vast amounts of patient data, AI algorithms can identify patterns and trends that might elude human analysis, leading to earlier and more accurate diagnoses. This not only expedites the diagnostic process but also enhances treatment efficacy and improves patient outcomes. Join us as we delve into the world of AI-driven medical imaging, where machine learning algorithms are aiding radiologists in detecting anomalies and pinpointing potential health risks with unparalleled precision. Additionally, we explore how AI-powered virtual health assistants are streamlining patient-doctor interactions, providing personalized care, and empowering patients to take charge of their health. While AI brings forth a multitude of opportunities, it also raises important considerations about data security, patient privacy, and the ethical use of AI in healthcare settings. We delve into these critical topics, emphasizing the need for robust safeguards and ethical guidelines to protect patient confidentiality and ensure responsible AI deployment. Our blog post sheds light on the ongoing collaborations between AI experts, healthcare professionals, and regulatory bodies, all working harmoniously to pioneer a future where AI complements human expertise, enhances medical decision-making, and ultimately elevates the standard of patient care. Discover how the integration of AI and healthcare is redefining the boundaries of medicine, fostering a new era of personalized treatment plans, and offering hope for a healthier and more connected world. Join us on this journey as we witness the unfolding revolution in patient care, driven by the unwavering alliance of cutting-edge technology and compassionate healthcare."
});

const defaultPosts = [post1, post2, post3];

app.get("/", function(req, res) {
  Post.find({})
      .then(function(foundPosts){
        if (foundPosts.length === 0) {
          Post.insertMany(defaultPosts)
              .then(function(){
                console.log("Successfully Inserted!");
              })
              .catch(function(err){
                console.log(err);
              });
              res.redirect("/");
        } else {
          res.render("home", {homeContent: homeStartingContent, posts: foundPosts});
        }
      })
      .catch(function(err){
        console.log(err);
    });
});

app.get("/posts/:title", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.title);
  
  Post.find({})
      .then(function(foundPosts){
        foundPosts.forEach(function(post){
          const actualTitle = _.lowerCase(post.title);
      
          if (actualTitle === requestedTitle){
            res.render("post", {title: post.title, content: post.content, date: post.date});
          } 
        });
      })
      .catch(function(err){
        console.log(err);
    });
});

app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get("/delete/:title", function(req, res) {
  const titleToBeDeleted = req.params.title;

  Post.findOneAndDelete({ title: titleToBeDeleted })
      .then(function(deletedPost){
        if (deletedPost) {
          console.log("Successfully deleted!");
          console.log("Deleted post:", deletedPost);
          res.redirect("/");
        } else {
          console.log("Post not found.");
        }
      })
      .catch(function(err){
        console.log(err);
      });
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  res.send('Thank you for your message!');
});

app.post("/compose", function(req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postContent
  });

  post.save();
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
