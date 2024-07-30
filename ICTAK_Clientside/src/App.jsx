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
      "Cybersecurity is the practice of protecting systems, networks, and data from digital attacks.",
  },
  {
    key: 2,
    title: "Full stack in mean",
    image: Mean,
    description:
      "Cybersecurity is the practice of protecting systems, networks, and data from digital attacks.",
  },
  {
    key: 3,
    title: "Full stack in mern",
    image:  Mern,
    description:
      "Cybersecurity is the practice of protecting systems, networks, and data from digital attacks.",
  },
  {
    key: 4,
    title: "Java programming",
    image: Java_programming ,
    description:
      "Cybersecurity is the practice of protecting systems, networks, and data from digital attacks.",
  },
  {
    key: 5,
    title: "Python ",
    image: Python  ,
    description:
      "Cybersecurity is the practice of protecting systems, networks, and data from digital attacks.",
  },
  {
    key: 6,
    title: "Machine learning and Artificial Intelligence ",
    image:  Machine_learning ,
    description:
      "Cybersecurity is the practice of protecting systems, networks, and data from digital attacks.",
  },
  {
    key: 7,
    title: "RPA",
    image: RPA,
    description:
      "Cybersecurity is the practice of protecting systems, networks, and data from digital attacks.",
  },
  {
    key: 8,
    title: "Virtual Internship - RPA",
    image:Virtual_internship_rpa ,
    description:
      "Cybersecurity is the practice of protecting systems, networks, and data from digital attacks.",
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
     <Navbar />
     <Login />
          </>
  );
}


export default App
