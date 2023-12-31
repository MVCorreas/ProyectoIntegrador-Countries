import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, postActivity, getDbCountries } from '../../redux/actions';
import styles from './StyledCreate.module.css';
import axios from 'axios';

export default function CreateActivity() {

    //?useSelector --> gets info from store
    //?useDispatch --> sends info to store
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const countries = useSelector((state) => state.countries); 
    const activities = useSelector((state) => state.activities);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isAnimated, setIsAnimated] = useState(false);

    const [input, setInput] = useState({
        name: '',
        type: '',
        description: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: [],      
    });

    const [errors, setErrors] = useState({
        name: '',
        type: '',
        description: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: [], 
    })

    useEffect(() => {
        dispatch(getActivities());
    }, []); //[] the effect runs once after the initial mount, this means the effect doesnt depend on any state or prop to function

    useEffect(() => {
        dispatch(getDbCountries());
      }, [dispatch]);// the effect will run whenever the dispatch function changes, or whatever is in the []. This means that the effect has access to the latest dispatch changes


//?INDIVUAL VALIDATION 

function validation(property, value) {
    switch (property) {
        case 'name':
            if (!value) {
                setErrors({ ...errors, name: 'Please, enter a name for the activity' });
            } else if (value.length > 50) {
                setErrors({ ...errors, name: 'The name should not exceed 50 characters' });
            } else if (activities && activities.some((activity) => activity.name.toLowerCase() === value.toLowerCase())) {
                setErrors({ ...errors, name: 'The activity name is already in use' });
            } else {
                setErrors({ ...errors, name: '' });
            }
            break;

        case 'description':
            if (!value) {
                setErrors({ ...errors, description: 'Please, enter a description for the activity' });
            } else if (value.length > 200) {
                setErrors({ ...errors, description: 'The description should not exceed 200 characters' });
            } else {
                setErrors({ ...errors, description: '' });
            }
            break;

        case 'difficulty':
            if (!value) {
                setErrors({ ...errors, difficulty: 'Please, choose one option from 1 (lowest) to 5 (highest)' });
            } else {
                setErrors({ ...errors, difficulty: '' });
            }
            break;

        case 'type':
            if (value.length === 0){
                setErrors({ ...errors, type: 'Please, select a type of activity' });
            } else {
                setErrors({ ...errors, type: '' });
            }
            break;

        case 'season':
            if (value === 'SelectSeason') {
                setErrors({ ...errors, season: 'Please, select a season' });
            } else {
                setErrors({ ...errors, season: '' });
            }
            break;

        case 'duration':
            if (value === '') {
                setErrors({ ...errors, duration: 'Please, choose an approximate duration for the activity' });
            } else {
                setErrors({ ...errors, duration: '' });
            }
            break;

        case 'countries':
            if (value.length === 0) {
                setErrors({ ...errors, countries: 'Choose one or more countries where the activity can be performed' });
            } else {
                setErrors({ ...errors, countries: '' });
            }
            break;

        default:
            setErrors({ ...errors, [property]: `Please, enter a ${property} for the activity` });
            break;
    }
}
//?FUNCTION TO VALIDATE THE ENTIRE FORM --> to provide messages only on submitting the form

function validateForm() {
    const fieldErrors = {
        name: '',
        type: '',
        description: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: [],
    };

    // Realiza las validaciones de todos los campos
    if (!input.name) {
        fieldErrors.name = 'Please, enter a name for the activity';
    } else if (input.name.length > 50) {
        fieldErrors.name = 'The name should not exceed 50 characters';
    } else if (activities && activities.some((activity) => activity.name.toLowerCase() === input.name.toLowerCase())) {
        fieldErrors.name = 'The activity name is already in use';
    }

    if (!input.description) {
        fieldErrors.description = 'Please, enter a description for the activity';
    } else if (input.description.length > 200) {
        fieldErrors.description = 'The description should not exceed 200 characters';
    }

    if (!input.difficulty) {
        fieldErrors.difficulty = 'Please, choose one option from 1 (lowest) to 5 (highest)';
    }

    if (!input.type) {
        fieldErrors.type = 'Please, select a type of activity';
    }

    if (!input.season) {
        fieldErrors.season = 'Please, select a season';
    }

    if (input.duration === '') {
        fieldErrors.duration = 'Please, choose an approximate duration for the activity';
    }

    if (input.countries.length === 0) {
        fieldErrors.countries = 'Choose one or more countries where the activity can be performed';
    }

    setErrors(fieldErrors);

    // Devuelve true si no hay errores, de lo contrario, devuelve false
    return Object.values(fieldErrors).every((error) => error === '');
}

//? FUCNION PARA VALIDAR LOS CAMBIOS DE INPUT 
    function handleChange (e) {
        const property = e.target.name;
        const value = e.target.value;

    setFormSubmitted(true);
    validation(property, value);
    setInput({ ...input, [property]: value });

    if (property === 'difficulty') { //animación de la barra pero solo si es ejecutada primero
        setIsAnimated(true);
      }
}
    
//?FUNCION PARA TODOS LOS SELECT Y VALIDACION DE ERRORES --> permite ver en el select los valores seleccionados
   
    function handleSelect(e) { 
        const selectedValue = e.target.value;
        const property = e.target.name;
    
        // Limpiar el mensaje de error actual para el campo
        setErrors({ ...errors, [property]: '' });
        
        if (property === 'season' || property === 'type') {
            setInput({
                ...input,
                [property]: selectedValue,
            });
            setIsAnimated(true);
        } else if (property === 'difficulty') {
            // Puedes convertir selectedValue a un número aquí si es necesario
            setInput({
                ...input,
                difficulty: parseInt(selectedValue), // Convertir el valor a número
            });
            setIsAnimated(true);
        } else if (property === 'countries') {
            if (selectedValue === 'SelectCountry') {
                // Setear un mensaje de error si se selecciona "SelectCountry"
                setErrors({ ...errors, countries: 'Choose one or more countries where the activity can be performed' });
            } else {
                // Limpiar el mensaje de error y agregar el país seleccionado
                setErrors({ ...errors, countries: '' });
                setInput({
                    ...input,
                    countries: [...input.countries, selectedValue],
                });
            }
        }
    
        // Establecer formSubmitted en true para activar los mensajes de error si es necesario
        setFormSubmitted(true);
    }
    

    //?DELETE SELECTED COUNTRY
    function handleRemoveCountry (country) {
        setInput({
            ...input,
            countries: input.countries.filter((c) => c !== country),
        });
    };

    //?SUBMIT BUTTON
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Llama a validateForm para verificar si hay errores
       validateForm();
            // Crea el objeto 'activity' y realiza la acción de envío
            const activity = {
                name: input.name,
                type: input.type,
                description: input.description,
                difficulty: input.difficulty,
                duration: input.duration,
                season: input.season,
                countries: input.countries,
            };

            try {
                const response = await axios.post('http://localhost:3001/activities', activity, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 201) {
                    setInput({
                        name: '',
                        type: '',
                        description: '',
                        difficulty: '',
                        duration: '',
                        season: '',
                        countries: [],
                    });
                    alert('Activity successfully created');
                    setTimeout(() => {
                        navigate('/home');
                      }, "2000");
                  
                } else {
                    console.error('Error in the activity POST', response);
                    alert('Please, complete all fields before submitting the form');
                }
            } catch (error) {
                console.error('Error in the POST request', error);
            }
        
    };

    return (
        <div>
            <h1 className={styles.FormTitle}>Create your Activity</h1>

            <div className={styles.FormContainer}>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.FormWrapper}>
                <div className={styles.formGrid}>
                    <div className={styles.labelForm} >
                    <label>Activity Name:</label>
                    </div>
                <div className={styles.inputWrapper}>
                    <input
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    className={styles.inputForm}
                    placeholder='Enter the name of the activity...'
                />
                {formSubmitted && errors.name && <span className={styles.StyledErrors}>{errors.name}</span>}
                </div>
                
                
                <div className={styles.labelForm}>
                    <label>Description:</label>
                </div>
                <div className={styles.inputWrapper}>
                    <textarea
                        value={input.description}
                        name="description"
                        onChange={(e) => handleChange(e)}
                        className={styles.textarea}
                    />
                    {formSubmitted && errors.description && <span className={styles.StyledErrors}>{errors.description}</span>}
                </div>
                
               

                 <div className={styles.labelForm}>
                    <label>Activity Type:</label>
                </div>
                <div className={styles.inputWrapper}>
                    <select
                        value={input.type}
                        name="type"
                        onChange={(e) => handleSelect(e)}
                        className={styles.selectForm}
                    >
                        <option value="SelectType">Select a Type</option>
                        <option value="City">City</option>
                        <option value="Country">Country</option>
                        <option value="Beach">Beach</option>
                        <option value="Forest">Forest</option>
                        <option value="Mountain">Mountain</option>
                    </select>
                    {formSubmitted && errors.type && <span className={styles.StyledErrors}>{errors.type}</span>}
                </div>
                
                <div className={styles.labelForm}>
                    <label>Season:</label>
                </div>
                <div className={styles.inputWrapper}>
                    <select
                    value={input.season}
                    name="season"
                    onChange={(e) => handleSelect(e)}
                    className={styles.selectForm}
                    >
                    <option value="SelectSeason">Select a Season</option>
                    <option value="Winter">Winter</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Autumn">Autumn</option>
                    </select>
                    {formSubmitted && errors.season && <span className={styles.StyledErrors}>{errors.season}</span>}
                </div>

                <div className={styles.labelForm}>
                    <label>Difficulty:</label>
                </div>
                <div className={styles.inputWrapper}>
                <select
                    value={input.difficulty}
                    name="difficulty"
                    onChange={(e) => handleSelect(e)}
                    className={styles.selectForm}
                >
                    <option value="SelectDifficulty">Select a level of difficulty</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                {formSubmitted && errors.difficulty && (
                    <span className={styles.StyledErrors}>{errors.difficulty}</span>
                )}
                <div className={styles.progressContainer}>
                <div className={styles.progressBar} style={{ width: `${input.difficulty * 20}%` }} >
                </div>
                </div>
                
                </div>
                                
              <div className={styles.labelForm}>
                    <label>Duration:</label>
                </div>
                <div>
                    <input 
                    type='time'
                    value={input.duration}
                    name='duration'
                    onChange={(e) => handleChange(e)}
                    />
                   {formSubmitted && errors.duration && <span className={styles.StyledErrors}>{errors.duration}</span>}
                </div>
                


              <div className={styles.labelForm}>
                    <label>Countries:</label>
                </div>
                <div>
                <select onChange={(e) => handleSelect(e)} name="countries" className={styles.selectForm}> 
                <option value="SelectCountry">Select a Country</option> 
                {countries
                    .slice() // Crea una copia del array original para no modificarlo directamente
                    .sort((a, b) => a.name.localeCompare(b.name)) 
                    .map((country) => (
                        <option key={country.id} value={country.name}>
                        {country.name}
                        </option>
                    ))}
                </select>
                <div>
                {formSubmitted && errors.countries && <span className={styles.StyledErrors}>{errors.countries}</span>}
                </div>
                </div>

                {input.countries.map((country) => (
                <div key={country} name='countries'>
                    {country}
                    <button type="button" onClick={() => handleRemoveCountry(country)}>X</button>
                </div>
                ))}

                <div >
                <button type="submit" className={styles.Button}>
                    <span className={styles.ButtonSpan}>Submit</span>
                </button>
                </div>
                </div>
            </form>
            </div>
        </div>
    )

}