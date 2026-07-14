import { useState, useContext, useEffect } from "react";
import skillsData from "../../../data/skillsV2.json";
import Dropdown from "./shareComponents/Dropdown";
import "./skills.css";
import AppContext from "./context/AppContext";
import translate from "../i18n/translate";

const iconScale = {
  "Angular-min.png": 1.08,
  "react-logo1-min.png": 1.1,
  "typescript-min.png": 0.85,
  "docker-png-min.png": 1.08,
  "html.png": 0.9,
  "css3-logo.png": 0.9,
  "js-logo.png": 0.9,
  "bootstrap-logo.png": 1.2,
  "material-ui.png": 0.9,
  "React-Native-Logo-min.png": 1.6,
  "Redux.png": 1.25,
  "csharp.png": 0.95,
  "netframework.png": 1.6,
  "Node.png": 1.45,
  "visualstudio_code.png": 1.8,
  "vs-2019-min.png": 1.6,
  "git.png": 0.9,
  "Neo4j-logo-min.png": 1.55,
  "aws-min.png": 1.55,
  "expo-min.png": 1.2,
  "Azure-cloud-min.png": 1.4,
  "github_PNG20.png": 0.95,
};

function Skills() {
  const [selected, setSelected] = useState("All");
  const [addAnimation, setAddAnimation] = useState("");

  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;

  let groupOfSkills = skillsData.skills.filter(
    (e) => e.title === `${selected}`
  );
  let skillsIcons = groupOfSkills.map((e) => e.icons);
  let arraySkills = skillsIcons[0];

  function addAnimationIcons() {
    setAddAnimation("skills-icons-animation");
    setTimeout(() => {
      setAddAnimation("");
    }, 1500);
  }

  useEffect(() => {
    addAnimationIcons();
  }, [selected]);

  return (
    <section id="Technologies-v2" className="skills-section">
      <h1 className="skills-title" data-aos="fade-right">
        {translate("title3")}
      </h1>

      <Dropdown selected={selected} setSelected={setSelected} />
      <div
        className={
          darkmode ? "skills__container-v2" : "skills__container-v2-white"
        }
      >
        {arraySkills?.map((icon) => (
          <div key={icon} className={`icon-img-container ${addAnimation}`}>
            <img
              src={`/images/logos/${icon}`}
              alt=""
              className="icon-img"
              style={{ "--icon-scale": iconScale[icon] || 1 }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
