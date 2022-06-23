import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import TabPanel from "components/TabPanel";
import axiosInstance from "configs/api";
import { useFormik } from "formik";
import { useRef, useState } from "react";

import * as Yup from "yup";

const myProfile = () => {
  const [isEdit, setIsEdit] = useState(true);
  const [tabMenu, setTabMenu] = useState(0);
  const [gender, setGender] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);

  const handleTabMenu = (event, newValue) => {
    setTabMenu(newValue);
  };

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    alert(event.target.files[0].name);
  };

  const editProfileHandler = async () => {
    const formData = new FormData();

    formData.append("profile_image_file", selectedFile);

    try {
      const res = await axiosInstance.patch(
        "/users/profile-picture/1",
        formData
      );

    setSelectedFile(null)
    } catch (err) {
      console.log(err);

    }
  };

  const profileFormik = useFormik({
    initialValues: {
      fullname: "",
      gender: "",
      age: "",
      email: "",
      id: "",
    },
    validationSchema: Yup.object().shape({
      fullname: Yup.string().required("this field is required"),
      gender: Yup.string().required("this field is required"),
      age: Yup.string().required("this field is required"),
      email: Yup.string()
        .email("please input a correct email format")
        .required("this field is required"),
      id: Yup.string().required("this field is required"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      setTimeout(async () => {
        try {
          const newProfile = {
            full_name: values.fullname,
            gender: values.gender,
            age: values.age,
            email: values.email,
            id: values.id,
          };

          console.log(newProfile);

          const res = await axiosInstance.patch("/users", newProfile);

          if (res?.data?.message !== undefined) {
            console.log("profile edited");
          }

          profileFormik.setSubmitting(false);
        } catch (err) {
          console.log(err?.response?.data?.message);
          profileFormik.setSubmitting(false);
        }
      }, 3000);
    },
  });

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: "40px" }}>
        <Grid container>
          <Grid item sm={4} md={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar sx={{ width: "80px", height: "80px", m: 3 }} />
              <Box>
                <Input
                  onChange={handleFile}
                  inputRef={inputFileRef}
                  type="file"
                  sx={{ display: "none" }}
                />
                {!selectedFile ? (
                  <Button
                    variant="contained"
                    sx={{ fontSize: "12px", fontWeight: "700" }}
                    onClick={() => inputFileRef.current.click()}
                    disabled={selectedFile ? true : false}
                  >
                    Edit Profile Picture
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    disabled={selectedFile ? false : true}
                    sx={{ fontSize: "12px" }}
                    onClick={editProfileHandler}
                  >
                    Save
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item sm={8} md={8}>
            <Box>
              <Tabs
                variant="fullWidth"
                onChange={handleTabMenu}
                value={tabMenu}
                centered
                sx={{
                  ".MuiTabs-indicator": {
                    backgroundColor: "brand.500",
                    color: "brand.500",
                  },
                }}
              >
                <Tab label="Profile" sx={{ textTransform: "none" }} />
                <Tab label="Address List" sx={{ textTransform: "none" }} />
              </Tabs>
            </Box>
            <TabPanel value={tabMenu} index={0}>
              <OutlinedInput
                onChange={(event) =>
                  profileFormik.setFieldValue("id", event.target.value)
                }
              />
              <FormControl sx={{ width: "500px", mb: "20px" }}>
                <FormLabel htmlFor="nama">Fullname</FormLabel>
                <OutlinedInput
                  id="nama"
                  size="small"
                  onChange={(event) =>
                    profileFormik.setFieldValue("fullname", event.target.value)
                  }
                  readOnly={isEdit}
                />
              </FormControl>
              <Box>
                <FormControl sx={{ mb: "30px" }}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    onChange={(event) =>
                      profileFormik.setFieldValue("gender", event.target.value)
                    }
                  >
                    <Box sx={{ display: "flex" }}>
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </Box>
                  </RadioGroup>
                </FormControl>
              </Box>
              <Stack spacing={3}>
                <FormControl sx={{ width: "100px" }}>
                  <FormLabel htmlFor="age">Age</FormLabel>
                  <OutlinedInput
                    id="age"
                    size="small"
                    readOnly={isEdit}
                    onChange={(event) =>
                      profileFormik.setFieldValue("age", event.target.value)
                    }
                  />
                </FormControl>
                <FormControl sx={{ width: "500px" }}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <OutlinedInput
                    id="email"
                    size="small"
                    readOnly={isEdit}
                    onChange={(event) =>
                      profileFormik.setFieldValue("email", event.target.value)
                    }
                  />
                </FormControl>
              </Stack>
              <Box sx={{ m: "30px", display: "flex" }}>
                <Button
                  variant="contained"
                  sx={{ width: "200px", mr: "20px" }}
                  onClick={() => setIsEdit(!isEdit)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  sx={{ width: "200px" }}
                  disabled={isEdit || profileFormik.isSubmitting}
                  onClick={profileFormik.handleSubmit}
                >
                  Save
                </Button>
              </Box>
            </TabPanel>
            <TabPanel value={tabMenu} index={1}>
              <FormControl sx={{ width: "500px" }}>
                <FormLabel htmlFor="address">Address</FormLabel>
                <OutlinedInput id="address" size="small" />
              </FormControl>
            </TabPanel>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default myProfile;
