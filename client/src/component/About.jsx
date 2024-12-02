import React from "react";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-28 text-justify text-gray-800">
      <div className=" ">
      <h1 className="text-4xl font-bold text-center mb-6  text-yellow-500 bg-blue-950 flex justify-center items-center h-36 ">About This Blog</h1>
      
      </div>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 ">Welcome to My Blog!</h2>
        <p className="text-lg">
          Hello and welcome! I'm <strong>Oghogho Marcus</strong>, the mind behind this blog. This space is dedicated to sharing insights, tips, and resources on <strong>web development</strong>, <strong>technology</strong>, and <strong>programming</strong>. Whether you're a seasoned developer, a tech enthusiast, or someone new to the world of coding, there's something here for everyone.
        </p>
      </section>

   
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Why This Blog?</h2>
        <p className="text-lg">
          I created this blog to:
        </p>
        <ul className="list-disc list-inside ml-6">
          <li><strong>Educate</strong>: Provide tutorials, guides, and step-by-step walkthroughs on various web development topics, covering technologies like <strong>React</strong>, <strong>Node.js</strong>, <strong>Redux</strong>, and <strong>Tailwind CSS</strong>.</li>
          <li><strong>Inspire</strong>: Share project ideas, best practices, and industry trends to help you stay ahead in the tech world.</li>
          <li><strong>Connect</strong>: Build a community where we can learn, grow, and exchange knowledge.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What You’ll Find Here</h2>
        <ul className="list-disc list-inside ml-6">
          <li><strong>In-Depth Tutorials</strong>: Detailed articles on <strong>JavaScript</strong>, <strong>ReactJS</strong>, <strong>Node.js</strong>, and more. Learn how to build full-stack applications and enhance your coding skills.</li>
          <li><strong>Project Ideas & Case Studies</strong>: Real-world projects and case studies to inspire you and provide insights into how different web applications are built.</li>
          <li><strong>Tech Reviews & Updates</strong>: Stay updated with the latest tools, libraries, and frameworks in the web development ecosystem.</li>
          <li><strong>Tips & Best Practices</strong>: Learn best coding practices, optimization techniques, and performance tips to build efficient and scalable applications.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-lg">
          I am a <strong>MERN Stack Developer</strong> from Nigeria with a passion for creating interactive, user-friendly applications. With a background in <strong>Physics with Electronics</strong>, I transitioned into the tech world and have been building projects that solve real-world problems. My journey into web development has been fueled by a desire to continuously learn and improve my skills.
        </p>
      </section>

     
      <section>
        <h2 className="text-2xl font-semibold mb-4">Join the Community</h2>
        <p className="text-lg mb-4">
          I believe in the power of sharing knowledge and collaborating with fellow developers. Feel free to leave comments, ask questions, and connect with me on social media. Let's learn together and make the web a better place!
        </p>
        <div className="flex flex-col gap-4">
          <p><strong>Email</strong>: <a href="mailto:marcusdam@example.com" className="text-blue-500 hover:underline">marcusdam@example.com</a></p>
          <p><strong>LinkedIn</strong>: <a href="https://www.linkedin.com/in/Oghogho-Marcus/" className="text-blue-500 hover:underline">Oghogho Marcus</a></p>
          <p><strong>GitHub</strong>: <a href="https://github.com/Marcusdam" className="text-blue-500 hover:underline">Marcusdam</a></p>
          <p><strong>Twitter</strong>: <a href="https://twitter.com/Marcusdam" className="text-blue-500 hover:underline">Marcusdam</a></p>
        </div>
      </section>

      
    </div>
  );
};

export default About;
