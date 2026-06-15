import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import "../styles/SkillPage.css"

const Skills = () => {

  // const {username} = useParams();
  const userID = localStorage.getItem("userID");
  const [skillList, setSkillList] = useState([]);

  const [skillName, setSkillName] = useState("");
  const [skillLevel, setLevel] = useState("Beginner");
  const [addedMsg, setAddedMsg] = useState("");



  const fetchSKills = async () =>{
    try{
      const token = localStorage.getItem("access");

      const response = await fetch(`http://127.0.0.1:8000/user/${userID}/skills/` ,{
        method : "GET",
        headers : {
          Authorization: `Bearer ${token}`
        },
    });
    const data = await response.json();
    if (response.ok) {
        setSkillList(data);
    } else {
        console.log(data);
    }
    }catch(error){
      console.log(error);
    }
  };

  useEffect(() =>{
    fetchSKills();
  }, []);
  
  const CloseOverlay = () =>{
    const overlay = document.querySelector(".AddSkillOverlay");
    overlay.style.display = "none"; 
  }

  const AddSkillOverlay = () =>{
    const overlay = document.querySelector(".AddSkillOverlay");
    overlay.style.display = "flex";

  }

  window.addEventListener("click", (e) =>{
    const overlay = document.querySelector(".AddSkillOverlay");
    if(e.target == overlay){
      CloseOverlay();
    }
  });

  const triggerAddSkill = async() =>{
    if (!skillName || !skillLevel){
      alert("Enter a skill name");
      return;
    } 

    try{
      const token = localStorage.getItem("access");

      const response = await fetch(`http://127.0.0.1:8000/user/${userID}/addSkill/`,{
        method : "POST",
        headers : {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          skill_name: skillName,
          skill_level: skillLevel,
        }),
      });
      const data = await response.json();
      console.log("POST Response:", data);

      if(response.ok){
        setSkillName("");
        setLevel("Beginner");
        setAddedMsg(`✅ ${skillName} is added!`);
        setTimeout(() => {
          setAddedMsg("");
        }, 3000);
        await fetchSKills();

        document.querySelector(".AddSkillOverlay").style.display = "none";
      }else{
        console.log(data);
      }
    }catch(error){
      console.error(error);
    }

  };

  const deleteSkill = async(skillID, skillName) =>{
    try{
      const token = localStorage.getItem("access");
      const confirmed = window.confirm(
        `Do you want to delete ${skillName}?`
      );

      if (!confirmed) return;
      const response = await fetch(`http://127.0.0.1:8000/user/${userID}/skills/${skillID}/delete/`, {
        method : 'DELETE',
        headers : {
          Authorization : `Bearer ${token}`,
        },
      });
      const data = response.json();
      if(response.ok){
        setSkillList((prev) => prev.filter((skill) => skill.id !== skillID));
        setAddedMsg(`❌ ${skillName} deleted`);
        setTimeout(()=>{
          setAddedMsg("");
        },3000)
      };
    }catch(error){
      console.log(error);
    }
  };

  return (
    <div className='skillPage'>
      <div className='AddSkillOverlay'>
        <div className='AddSkillContainer'>
          <div id='SkillInput'>
            <div id='topHead'>
              <h2>Add skills <hr></hr></h2>
              <a onClick={CloseOverlay}>✖</a>
            </div>
            <div id='InputsSkills'>
              <input type="text" placeholder='Enter Skill' required value={skillName} onChange={(e) => setSkillName(e.target.value)}/>
              <select name='level' value={skillLevel} onChange={(e) => setLevel(e.target.value)}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <button type='submit' onClick={triggerAddSkill}>Add</button>
          </div>
        </div>
      </div>
      <div id='skillPageTop'>
        <h1>Skills</h1>
        <button onClick={AddSkillOverlay}>+ Add Skill</button>
        {addedMsg && (
          <h3 className='skillMessage'>
            {addedMsg}
          </h3>
        )}
      </div>
      <div className='skillContainer'>
        {skillList && skillList.length > 0 ? (
          skillList.map((skill) => (
            <div key={skill.id} className='skillGrid'>
              <div className='SkillCard'>
                <div className='CardTop'>
                  <h3>{skill.skill_name}</h3>
                  <a className='deleteSkill' onClick={() => deleteSkill(skill.id, skill.skill_name)} title='Delete'>✖</a>
                </div>
                
                <p id='skillLvl'>{skill.skill_level}</p>
                <div className='bottomLine'>
                  <p id='skillCreated'>{skill.created_at}</p> 
                  <a href={`https://www.geeksforgeeks.org/search/?gq=${skill.skill_name}`} target = "_blank" rel = "noopener noreferrer">Practice Now</a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div id='NoskillText'>
            <h3>No skills added!</h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default Skills