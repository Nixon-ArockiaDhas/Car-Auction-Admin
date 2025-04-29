import React, { useState, useEffect } from "react";
import FormTextField from "../textfield/textfield";
import { Button, Container, Grid2 } from "../../MaterialComponents";
import './dynamicForms.css'

const DynamicForms = ({ fileData }) => {
    const [forms, setForms] = useState([{
        id: Date.now(),
        fields: {
            make: "",
            model: "",
            variant: "",
            yearOfManufacture: "",
            chassis: "",
            price: "",
            image: [],
            color: "", 
        }
    }]);
    const [formData, setFormData] = useState({});
    const [fileDataProcessed, setFileDataProcessed] = useState(false);
    const [disableField, setDisableFeild] =  useState(false);
    const handleAddForm = () => {
        setForms([
            ...forms,
            {
                id: Date.now(),
                fields: {
                    make: "",
                    model: "",
                    variant: "",
                    yearOfManufacture: "",
                    chassis: "",
                    price: "",
                    image: [],
                    color: "", 
                },
            },
        ]);
    };

    const handleDeleteForm = (id) => {
        const newForms = forms.filter((form) => form.id !== id);
        setForms(newForms);
        const newState = { ...formData };
        delete newState[id];
        const reIndexedState = {};
        newForms.forEach((form, index) => {
            reIndexedState[index] = newState[form.id];
        });
        setFormData(reIndexedState);
    };
    
    const handleInputChange = (value, index, name) => {
        setFormData((prevState) => {
          const newState = { ...prevState };
          if (!newState[index]) newState[index] = {};
          newState[index][name] = value;
          return newState;
        });
      };
      
      
    const populateForms = (fileData) => {
        console.log("Data from Excel:", fileData);
        const newForms = fileData.map((row, index) => ({
            id: index,
            fields: {
                make: row.Make || "",
                model: row.Model || "",
                variant: row.Variant || "",
                yearOfManufacture: row.YearOfManufacture || "",
                chassis: row.Chassis || "",
                price: row.Price || "",
                image: [],
                color: row.Color || "", 
            }
        }));
        setForms(newForms);
        const newState = {};
        fileData.forEach((row, index) => {
            newState[index] = {
                make: row.Make || "",
                model: row.Model || "",
                variant: row.Variant || "",
                yearOfManufacture: row.YearOfManufacture || "",
                chassis: row.Chassis || "",
                price: row.Price || "",
                color: row.Color || "", 
            };
        });
        console.log("New State:", newState);
        setFormData(newState);
    };

    useEffect(() => {
        if (fileData && fileData.length > 0 && !fileDataProcessed) {
          populateForms(fileData);
          setFileDataProcessed(true);
        }
      }, [fileData, fileDataProcessed]);

    return (
        <Container maxWidth={"xxl"} className="formbg">
            <div>
                {forms.map((form, index) => (
                    <div key={form.id} className="forms">
                        <h4 className="formHeading">Car {index + 1}</h4>
                        <Grid2 container spacing={2}>
                            <Grid2 size={11}>
                                <Grid2 container spacing={2}>
                                    <Grid2  size={3}>
                                        <FormTextField
                                            label="Car Make"
                                            value={formData[index]?.make || form.fields.make}
                                            onChange={(value) => handleInputChange(value, index, 'make')}
                                            disabled={disableField}
                                        />
                                    </Grid2>
                                    <Grid2 size={3}>
                                        <FormTextField
                                            label="Car Model" 
                                            value={formData[index]?.model || form.fields.model}
                                            onChange={(value) => handleInputChange(value, index, 'model')}
                                            disabled={disableField}
                                        />
                                    </Grid2>
                                    <Grid2 size={3}>
                                        <FormTextField
                                            label="Car Variant"
                                            value={formData[index]?.variant || form.fields.variant}
                                            onChange={(value) => handleInputChange(value, index, 'variant')}
                                            disabled={disableField}
                                        />
                                    </Grid2>
                                    <Grid2 size={3}>
                                        <FormTextField
                                            label="Year of Manufacture"
                                            value={formData[index]?.yearOfManufacture || form.fields.yearOfManufacture}
                                            onChange={(value) => handleInputChange(value, index, 'yearOfManufacture')}
                                            disabled={disableField}
                                        />
                                    </Grid2>
                                    <Grid2 size={3}>
                                        <FormTextField
                                            label="Car Chassis Number"
                                            value={formData[index]?.chassis || form.fields.chassis}
                                            onChange={(value) => handleInputChange(value, index, 'chassis')}
                                            disabled={disableField}
                                        />
                                    </Grid2>
                                    <Grid2 size={3}>
                                        <FormTextField
                                            label="Car Color"
                                            value={formData[index]?.color || form.fields.color}
                                            onChange={(value) => handleInputChange(value, index, 'color')}
                                            disabled={disableField}
                                        />
                                    </Grid2>
                                    <Grid2 size={3}>
                                        <FormTextField
                                            label="Base Price"
                                            value={formData[index]?.price || form.fields.price}
                                            onChange={(value) => handleInputChange(value, index, 'price')}
                                            disabled={disableField}
                                        />
                                    </Grid2>
                                    <Grid2 size={3} className='uloadGrid'>
                                        <Button
                                            className="uploadButton formUpload"
                                            component="label"
                                            role={undefined}
                                            variant="outlined"
                                            disabled={disableField}
                                            tabIndex={-1}> 
                                            Click to upload car images
                                            <input
                                                type="file"
                                                onChange={(event) => console.log(event.target.files)}
                                                hidden/>
                                            <img style={{ marginLeft: "5rem" }} src="/images/icons/Paperclip.svg" />
                                        </Button>
                                    </Grid2>
                                </Grid2>
                            </Grid2>
                            <Grid2 size={1} container justifyContent="center">
                                <Button
                                    onClick={() =>
                                        index === forms.length - 1
                                            ? handleAddForm()
                                            : handleDeleteForm(form.id)
                                    }>
                                    <img src={index === forms.length - 1 ? '/images/icons/add-colored.svg' : '/images/icons/trash.svg'} />
                                </Button>
                            </Grid2>
                        </Grid2>
                    </div>
                ))}
            </div>
        </Container>
    )
}
export default DynamicForms;
