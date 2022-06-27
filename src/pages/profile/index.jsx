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
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import ProductCheckoutContainer from "components/ProductCheckoutContainer";
import TabPanel from "components/TabPanel";
import TemplateModal from "components/TemplateModal";
import axiosInstance from "configs/api";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { MdClose } from "react-icons/md";

import * as Yup from "yup";

const myProfile = () => {
  const [isEdit, setIsEdit] = useState(true);
  const [tabMenu, setTabMenu] = useState(0);
  const [gender, setGender] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
  };

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

      setSelectedFile(null);
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

  const addressFormik = useFormik({
    initialValues: {
      address: "",
      recipient_name: "",
      recipient_telephone: "",
      province: "",
      city: "",
      kecamatan: "",
      postal_code: "",
      is_main_address: false,
      address_label: "",
    },
    validationSchema: Yup.object().shape({
      address: Yup.string().required("this field is required"),
      recipient_name: Yup.string().required("this field is required"),
      recipient_telephone: Yup.string().required("this field is required"),
      province: Yup.string().required("this field is required"),
      city: Yup.string().required("this field is required"),
      kecamatan: Yup.string().required("this field is required"),
      postal_code: Yup.string().required("this field is required"),
      // is_main_address: Yup.boolean(),
      address_label: Yup.string().required("this field is required"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      setTimeout(async () => {
        try {
          const newAddress = {
            address: values.address,
            recipient_name: values.recipient_name,
            recipient_telephone: values.recipient_name,
            province: values.province,
            city: values.city,
            kecamatan: values.kecamatan,
            postal_code: values.postal_code,
            // kalo boolean gimana cara validatenya
            is_main_address: values.is_main_address,
            address_label: values.address_label,
          };

          console.log(newAddress);

          const res = await axiosInstance.post("/users/address/1", newAddress);

          if (res?.data?.message !== undefined) {
            console.log("Added new address");
          }

          addressFormik.setSubmitting(false);
        } catch (err) {
          console.log(err);
          addressFormik.setSubmitting(false);
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

            {/* {  ADDRESS  } */}

            <TabPanel value={tabMenu} index={1}>
              <Box
                sx={{ display: "flex", justifyContent: "right", mb: "10px" }}
              >
                <Button variant="contained" size="small" onClick={handleOpen}>
                  Tambah Alamat
                </Button>
              </Box>
              <ProductCheckoutContainer
                cardTitle={
                  <Typography fontWeight="700" fontSize="18px">
                    Alamat
                  </Typography>
                }
              ></ProductCheckoutContainer>
              <Modal open={openModal} onClose={handleClose}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 700,
                    height: 600,
                    bgcolor: "background.paper",
                    borderRadius: "8px",
                    boxShadow: 24,
                    p: 2,
                  }}
                >
                  {/* Header */}
                  <Box sx={{ width: "100%", position: "relative" }}>
                    <Box
                      sx={{ position: "absolute", right: "0px", top: "0px" }}
                    >
                      <IconButton onClick={handleClose}>
                        {<MdClose />}
                      </IconButton>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pt: "5px",
                      }}
                    >
                      <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                        Add New Address
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ padding: "20px" }}>
                    <Grid container spacing={1}>
                      <Grid item sm={6} md={6}>
                        <Stack spacing={3}>
                          <FormControl>
                            <Typography>Label Alamat</Typography>
                            <OutlinedInput
                              size="small"
                              onChange={(event) =>
                                addressFormik.setFieldValue(
                                  "address_label",
                                  event.target.value
                                )
                              }
                            />
                          </FormControl>
                          <FormControl>
                            <Typography>Nama Penerima</Typography>
                            <OutlinedInput
                              size="small"
                              onChange={(event) =>
                                addressFormik.setFieldValue(
                                  "recipient_name",
                                  event.target.value
                                )
                              }
                            />
                          </FormControl>
                          <FormControl>
                            <Typography>Nomor Hp</Typography>
                            <OutlinedInput
                              size="small"
                              onChange={(event) =>
                                addressFormik.setFieldValue(
                                  "recipient_telephone",
                                  event.target.value
                                )
                              }
                            />
                          </FormControl>
                        </Stack>
                      </Grid>
                      <Grid item sm={6} md={6}>
                        <Stack spacing={3}>
                          <FormControl>
                            <Typography>Provinsi</Typography>
                            <OutlinedInput
                              size="small"
                              onChange={(event) =>
                                addressFormik.setFieldValue(
                                  "province",
                                  event.target.value
                                )
                              }
                            />
                          </FormControl>
                          <FormControl>
                            <Typography>Kabupaten/Kota</Typography>
                            <OutlinedInput
                              size="small"
                              onChange={(event) =>
                                addressFormik.setFieldValue(
                                  "city",
                                  event.target.value
                                )
                              }
                            />
                          </FormControl>
                          <FormControl>
                            <Typography>Kecamatan</Typography>
                            <OutlinedInput
                              size="small"
                              onChange={(event) =>
                                addressFormik.setFieldValue(
                                  "kecamatan",
                                  event.target.value
                                )
                              }
                            />
                          </FormControl>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Stack spacing={3} sx={{ mt: "15px" }}>
                      <FormControl>
                        <Typography>Alamat</Typography>
                        <OutlinedInput
                          size="small"
                          onChange={(event) =>
                            addressFormik.setFieldValue(
                              "address",
                              event.target.value
                            )
                          }
                        />
                      </FormControl>
                      <Box sx={{ display: "flex", alignItems: "end" }}>
                        <FormControl>
                          <Typography>Kode Pos</Typography>
                          <OutlinedInput
                            size="small"
                            sx={{ width: "200px", mr: "80px" }}
                            onChange={(event) =>
                              addressFormik.setFieldValue(
                                "postal_code",
                                event.target.value
                              )
                            }
                          />
                        </FormControl>
                        <FormControlLabel
                          label="set as main address"
                          control={
                            <Checkbox onChange={() => setValue(!value)} />
                          }
                        />
                      </Box>
                    </Stack>
                    <Stack sx={{ mt: "60px" }}>
                      <Button
                        variant="contained"
                        disabled={addressFormik.isSubmitting}
                        onClick={addressFormik.handleSubmit}
                      >
                        Add Address
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </Modal>
            </TabPanel>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default myProfile;
