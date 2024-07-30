import { Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './components/Login';
import MentorDashboard from './components/mentor/MentorDashboard';
import Submissions from './components/mentor/Submissions';
import Evaluation from './components/mentor/Evaluation';
import ReferenceMaterial from './components/mentor/ReferenceMaterial';
import ReferenceMaterialForm from './components/mentor/ReferenceMaterialForm';
import Main from './components/Main';
import Privateroutes from './Privateroutes';
//home
import Navbar from "./components/Home/Navbar";
import NavbarThree from "./components/Home/NavbarThree";
import Hero from "./components/Home/Hero";
import Programs from "./components/Home/Programs";
import Title from "./components/Home/Title";
import Internship from "./components/Home/Internship";
import Mern from "./assets/mern.png";
import Internship_img from "./assets/internship.png";
import Mean from "./assets/mean.png";
import Python from "./assets/python.png";
import Machine_learning from "./assets/machine-learning.png";
import RPA from "./assets/rpa.png";
import Virtual_internship_rpa from "./assets/virtual-internship-RPA.png";
import Java_programming from "./assets/java-programming.png";
import Footer from "./components/Home/Footer";
import ProjectsList from './components/admin/ProjectsList';
import MentorsList from './components/admin/MentorsList';

const internships = [
  {
    key: 1,
    title: "Cyber security",
    image: Internship_img,
    description:
      "Cybersecurity is the practice of protecting systems, networks, and data from digital attacks. It involves implementing measures to defend against unauthorized access, data breaches, and other cyber threats, ensuring the integrity, confidentiality, and availability of information.",
  },
  {
    key: 2,
    title: "Full stack in mean",
    image: Mean,
    description:
      "Full Stack in MEAN involves developing web applications using MongoDB, Express.js, Angular, and Node.js. It covers both frontend and backend development, enabling the creation of robust and scalable web applications.",
  },
  {
    key: 3,
    title: "Full stack in mern",
    image:  Mern,
    description:
      "Full Stack in MERN encompasses MongoDB, Express.js, React, and Node.js for web development. This stack allows developers to build dynamic and responsive web applications, managing both client and server-side operations.",
  },
  {
    key: 4,
    title: "Java programming",
    image: Java_programming ,
    description:
      "Java programming is a versatile and widely-used language for building cross-platform applications. It is known for its object-oriented structure, portability, and robustness, making it ideal for web, mobile, and enterprise applications.",
  },
  {
    key: 5,
    title: "Python ",
    image: Python  ,
    description:
      "Python is a high-level, interpreted programming language known for its simplicity and readability. It is widely used in web development, data analysis, artificial intelligence, scientific computing, and automation.",
  },
  {
    key: 6,
    title: "Machine learning and Artificial Intelligence ",
    image:  Machine_learning ,
    description:
      "Machine Learning and Artificial Intelligence involve creating algorithms and models that enable computers to learn and make decisions. They are applied in various fields such as data analysis, robotics, natural language processing, and predictive analytics.",
  },
  {
    key: 7,
    title: "RPA",
    image: RPA,
    description:
      "RPA uses software robots to automate repetitive and rule-based tasks in business processes. It enhances efficiency and accuracy by mimicking human actions, allowing employees to focus on more strategic activities.",
  },
  {
    key: 8,
    title: "Virtual Internship - RPA",
    image:Virtual_internship_rpa ,
    description:
      "A Virtual Internship in RPA provides hands-on experience in automating business processes using RPA tools. Participants learn to design, develop, and deploy RPA solutions remotely, gaining practical skills for the digital workforce.",
  },
];

function App() {
 
  return (
    <Routes>
      <Route path="/" element={<HomeWithNavbar />} />
      <Route path="/login" element={<LoginWithNavbar />} />
      <Route element={<Privateroutes/>}>
             <Route path="/admin" element={<Main child={<ProjectsList />} />} />
             <Route path="/admin/mentorslist" element={<Main child={<MentorsList />} />} />
             <Route path="/mentordashboard"   element={<Main child={<MentorDashboard />} />}      />
             <Route path="/submissions/:projectTopic"  element={<Main child={<Submissions />} />}  />
      <Route path="/evaluate/:id" element={<Main child={<Evaluation />} />} />
      <Route path="/edit/:id" element={<Main child={<Evaluation />} />} />
      <Route path="/reference-materials" element={<Main child={<ReferenceMaterial />} />}
      />
      <Route
        path="/reference-materials-form"
        element={<Main child={<ReferenceMaterialForm />} />}
      />
          </Route>
    </Routes>

  );
}

function HomeWithNavbar() {
  return (
    <>
     <Navbar />
      <Hero />

      <div className="containers">
        <Title
          subTitle="Popular courses Provided by ICT Academy"
          title="We offer"
        />
        <Programs />
        <Title subTitle="Internship programs" title="By ICTAK" />

        <div className="card-face">
          {internships.map((card) => (
            <Internship {...card} key={card.key} />
          ))}
        </div>
        
       
      </div>
      <Footer/>
    </>
  );
}

//

function LoginWithNavbar() {
  return (
    <>
     <NavbarThree />
     <Login />
          </>
  );
}


export default App
