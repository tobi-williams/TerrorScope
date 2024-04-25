import '../styling/About.css'; // Import the CSS for this page

function AboutPage() {
  return (
    <div className="about-container">
      <h1>About the GTD Web Application</h1>
      <section className="introduction">
        <h2>Introduction</h2>
        <p>This proposal outlines the development of a web application designed to interface with a database that provides access to and visualizes data about terrorism events from the Global Terrorism Database (GTD). The GTD is a meticulous compilation of terrorist events worldwide from 1970 to 2020, collated by The National Consortium for the Study of Terrorism and Responses to Terrorism (START) at the University of Maryland, College Park.</p>
      </section>
      <section className="objective">
        <h2>Objective</h2>
        <p>The primary goal of this project is to create an interactive and user-friendly web platform that enables users to query, analyze, and visualize terrorism data effectively. It will serve researchers, analysts, policy-makers, and the public who are interested in understanding trends, patterns, and details of terrorism incidents over the last five decades.</p>
      </section>
      <section className="dataset">
        <h2>Dataset</h2>
        <p>The dataset for this project is the GTD, which encompasses over 200,000 detailed records of terrorism events. Each record includes various attributes such as date, location, attack type, perpetrators, casualties, and more. The comprehensiveness of the GTD makes it an unparalleled resource for terrorism research and analysis.</p>
      </section>
      <section className="database-design">
        <h2>Database Design</h2>
        <p>The database will be structured into the following seven meaningful tables to reduce redundancy and ensure data integrity: Event Details, Location, Attack Details, Target and Victim Details, Perpetrator Details, Weapon Details, Damage. Each table will have a primary key, and foreign keys will establish relationships between tables.</p>
      </section>
      <section className="technology-stack">
        <h2>Technology Stack</h2>
        <ul>
          <li>Frontend: React</li>
          <li>Backend: Node.js</li>
          <li>Database: MariaDB</li>
        </ul>
      </section>
      <section className="user-interface">
        <h2>User Interface</h2>
        <p>The web application will include a robust search/dropdown select functionality allowing users to filter the data based on specific attributes, and data visualization tools to represent the data visually through summary statistics and maps.</p>
      </section>
      <h1>
        <a href="/home">Go Home</a>
      </h1>
    </div>
  );
}

export default AboutPage;