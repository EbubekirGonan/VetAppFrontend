import axios from 'axios'
import { useState, useEffect, useRef } from 'react'

function Vaccination() {

  const [vaccines, setVaccines] = useState([])
  const [animals, setAnimals] = useState([])
  const [update, setUpdate] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const protectionStartDateRef = useRef(null)
  const protectionFinishDateRef = useRef(null)

  const [newVaccine, setNewVaccine] = useState({
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animalWithoutCustomer: ""
  })

  const [updateVaccine, setUpdateVaccine] = useState({
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animalWithoutCustomer: ""
  })

  useEffect(() => {
    axios
    .get(import.meta.env.VITE_APP_BASEURL + "api/v1/vaccinations")
    .then((res) => {
    setVaccines(res.data.content);
    // console.log(res.data.content)
  })

    axios
    .get(import.meta.env.VITE_APP_BASEURL + "api/v1/animals")
    .then((res) => setAnimals(res.data.content))
    .then(() => setUpdate(false))

  }, [update])

  

  const handleNewVaccineInputChange = (e) => {
    const { name, value } = e.target;
    setNewVaccine((prev) =>({
      ...prev,
      [name]: value,
    }))
  }

  const handleNewVaccine = () => {
    console.log(newVaccine);
    axios
    .post(import.meta.env.VITE_APP_BASEURL + "api/v1/vaccinations", newVaccine)
    .then(() => setUpdate(true))
    .then(setNewVaccine({
      name: "",
      code: "",
      protectionStartDate: "",
      protectionFinishDate: "",
      animalWithoutCustomer: ""
    }))
  }


  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    const obj = animals.find((animal) => animal.id == value)
    console.log(obj);
    console.log(vaccines)
    setNewVaccine({
      ...newVaccine,
      [name]: obj,
    })
  }

  const handleDeleteInput = (e) => {
    const {id} = e.target
    axios
    .delete(import.meta.env.VITE_APP_BASEURL + `api/v1/vaccinations/${id}`)
    .then(() => setUpdate(true))
  }


  const handleUpdateInput = (e) => {
    const { id } = e.target;
    setIsUpdating(true)
    setUpdateVaccine(vaccines.find((vaccine) => vaccine.id == id))
  }

  const handleUpdateVaccineInputChange = (e) => {
    const [name, value] = e.target
    setUpdateVaccine((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdateVaccineBtn = (e) => {
    const {id} = updateVaccine
    axios
    .put(import.meta.env.VITE_APP_BASEURL + `api/v1/vaccinations${id}`, updateVaccine)
    .then(() => setIsUpdating(false))
    .then(() => setUpdateVaccine({
      name: "",
      code: "",
      protectionStartDate: "",
      protectionFinishDate: "",
      animalWithoutCustomer: ""
    }))
    .then(() => setUpdate(true))
  }

  const handleSearchVaccineByAnimalName = (value) => {
    if(value == ''){
      setUpdate(true)
    } else {
      const searchedVaccine = vaccines.filter((vaccine) => vaccine.animal.name.toLowerCase().includes(value))
      setVaccines(searchedVaccine);
    }
  }

  const searchVaccineByRange = () => {
    const startDate = protectionStartDateRef.current.value
    const finishDate = protectionFinishDateRef.current.value
    axios
    .get(import.meta.env.VITE_APP_BASEURL + `api/v1/vaccinations/searchByVaccinationRange?startDate=${startDate}&endDate=${finishDate}`)
    .then((res) => {
      setVaccines(res.data.content);
      console.log(res.data.content);
    })
  }


  return (
    <>
    <div>

      <h3>Search Vaccine by Animal Name</h3>
      <input 
      type="text"
      placeholder='Search Vaccine By Animal Name'
      onChange={(e) => handleSearchVaccineByAnimalName(e.target.value)}
      />

      <div>
        <h3>Search Vaccine by Range</h3>
        <label>Vaccine Protection Start Date</label>
        <input type="date" id='protectionStartDate' ref={protectionStartDateRef}/>

        <label>Vaccine Protection Finish Date</label>
        <input type="date" id='protectionFinishDate' ref={protectionFinishDateRef}/>
        <button onClick={searchVaccineByRange}>Search</button>
        <button onClick={() => setUpdate(true)}>Show All</button>
      </div>
    </div>
      
    <div className='add-and-update-bar'>
      <h2>Add New Vaccine</h2>
      <input 
      type="text"
      placeholder='name'
      name='name'
      value={newVaccine.name}
      onChange={handleNewVaccineInputChange}
      />
      <input 
      type="text"
      placeholder='code'
      name='code'
      value={newVaccine.code}
      onChange={handleNewVaccineInputChange}
      />
      <input 
      type="date"
      placeholder='protectionStartDate'
      name='protectionStartDate'
      value={newVaccine.protectionStartDate}
      onChange={handleNewVaccineInputChange}
      />
      <input 
      type="date"
      placeholder='protectionFinishDate'
      name='protectionFinishDate'
      value={newVaccine.protectionFinishDate}
      onChange={handleNewVaccineInputChange}
      />
      <select name="animalWithoutCustomer" onChange={handleSelectChange}>
        <option value="">Select Animal</option>
          {animals?.map((animal) =>(
            <option key={animal.id} value={animal.id}>
              {animal.name}
            </option>
          ))}
      </select>
      <button onClick={handleNewVaccine}> Add New Vaccine </button>

      {isUpdating &&
      <div>
        <h2>Update Vaccine</h2>
        <input 
        type="text"
        placeholder='name'
        name='name'
        value={updateVaccine.name}
        onChange={handleUpdateVaccineInputChange}
        />
        <input 
        type="text"
        placeholder='code'
        name='code'
        value={updateVaccine.code}
        onChange={handleUpdateVaccineInputChange}
        />
        <input 
        type="date"
        placeholder='protectionStartDate'
        name='protectionStartDate'
        value={updateVaccine.protectionStartDate}
        onChange={handleUpdateVaccineInputChange}
        />
        <input 
        type="date"
        placeholder='protectionFinishDate'
        name='protectionFinishDate'
        value={updateVaccine.protectionFinishDate}
        onChange={handleUpdateVaccineInputChange}
        />
        <select name="animalWithoutCustomer" disabled>
          <option value="">{updateVaccine.animal.name}</option>
        </select>
        <button onClick={handleUpdateVaccineBtn}> Update Vaccine </button> 

      </div>
      }
    </div>

    <table>
      <thead>
        <tr>
          <th>Vaccine Name</th>
          <th>Vaccine Code</th>
          <th>Vaccine Protection Start Date</th>
          <th>Vaccine Protection Finish Date</th>
          <th>Vaccined Animal</th>
        </tr>
      </thead>
      <tbody>
        {vaccines.map((vaccine, index) => (
          <tr key={index}>
            <td>{vaccine.name}</td>
            <td>{vaccine.code}</td>
            <td>{vaccine.protectionStartDate}</td>
            <td>{vaccine.protectionFinishDate}</td>
            <td>{vaccine.animal.name}</td>
            <button id={vaccine.id} onClick={handleDeleteInput}>DELETE</button>
            <button id={vaccine.id} onClick={handleUpdateInput}>UPDATE</button>
          </tr>
        
        ))}
      </tbody>
    </table>




      {/* <ul>
          {vaccines.map((vaccine) => (
            <div key={vaccine.id}>
              <li>
                {vaccine.name} - {vaccine.code} - {vaccine.protectionStartDate} - 
                {vaccine.protectionFinishDate} - {vaccine.animal.name} - 

                <span id={vaccine.id} onClick={handleDeleteInput}>DELETE</span> - 
                <span id={vaccine.id} onClick={handleUpdateInput}>UPDATE</span>
                </li>
            </div>          
          ))}
        </ul> */}

   
      
    </>
  )
}

export default Vaccination