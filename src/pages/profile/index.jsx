import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  FormControl,
  FormControlLabel,
  FormHelperText,
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
  Tooltip,
  Typography,
} from "@mui/material";
import ProductCheckoutContainer from "components/ProductCheckoutContainer";
import TabPanel from "components/TabPanel";
import InfoIcon from "@mui/icons-material/Info";
import TemplateModal from "components/TemplateModal";
import axiosInstance from "configs/api";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "redux/reducers/auth";
import { MdClose } from "react-icons/md";
import * as Yup from "yup";

const myProfile = () => {
  const [isEdit, setIsEdit] = useState(true);
  const [tabMenu, setTabMenu] = useState(0);
  const [gender, setGender] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [openModalPassword, setOpenModalPassword] = useState(false);
  const inputFileRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(false);
  const userSelector = useSelector((state) => state.auth);
  const handleOpen = () => setOpenModal(true);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenModal(false);
  };
  const closeModal = () => {
    setOpenModalPassword(false);
  };

  const handleTabMenu = (event, newValue) => {
    setTabMenu(newValue);
  };

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    alert(event.target.files[0].name);
  };

  const editProfileHandler = async () => {
    const formData = new FormData();

    formData.append("profile_image_file", selectedFile);

    try {
      const res = await axiosInstance.patch("/users/profile-picture", formData);
      console.log(res.data.result);

      dispatch(login(res.data.result));
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
    },
    validationSchema: Yup.object().shape({
      fullname: Yup.string(),
      gender: Yup.string(),
      age: Yup.string(),
      email: Yup.string().email("please input a correct email format")
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      setTimeout(async () => {
        try {
          const newProfile = {
            full_name: values.fullname || userSelector.username,
            gender: gender || userSelector.gender,
            age: values.age || userSelector.age,
            email: values.email || userSelector.email,
          };

          const res = await axiosInstance.patch("/users", newProfile);

          if (res?.data?.message !== undefined) {
            console.log("profile edited");
          }

          profileFormik.setSubmitting(false);
          setIsEdit(!isEdit)
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
            is_main_address: values.is_main_address,
            address_label: values.address_label,
          };

          console.log(newAddress);

          const res = await axiosInstance.post("/users/address", newAddress);

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

  const passwordFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string()
        .required("Current Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      newPassword: Yup.string()
        .required("New Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      repeatPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf(
          [Yup.ref("newPassword"), null],
          "Confirm Password does not match"
        ),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const userChangePassword = {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        };
        await axiosInstance.post("/auth/change-password", userChangePassword);

        setOpenModalPassword(false);
      } catch (err) {
        console.log(err?.response?.data?.message);
      }
    },
  });

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

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
              <Avatar
                src={userSelector.profile_image}
                sx={{ width: "150px", height: "150px", m: 3 }}
              />
              <Box mb="5px">
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
              <Box>
                <Button
                  variant="contained"
                  sx={{ fontSize: "12px", fontWeight: "700" }}
                  onClick={() => setOpenModalPassword(true)}
                >
                  Ganti Password
                </Button>
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
              <FormControl sx={{ width: "500px", mb: "20px" }}>
                <FormLabel htmlFor="nama">Fullname</FormLabel>
                <OutlinedInput
                  value={userSelector.full_name || userSelector.username}
                  id="nama"
                  size="small"
                  onChange={(event) =>
                    profileFormik.setFieldValue("fullname", event.target.value)
                  }
                  disabled={isEdit}
                />
              </FormControl>
              <Box>
                <FormControl sx={{ mb: "30px" }}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <Select
                    size="small"
                    value={gender || userSelector.gender}
                    disabled={isEdit}
                    sx={{ width: "150 px" }}
                    onChange={handleChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Stack spacing={3}>
                <FormControl sx={{ width: "100px" }}>
                  <FormLabel htmlFor="age">Age</FormLabel>
                  <OutlinedInput
                    id="age"
                    size="small"
                    value={userSelector.age}
                    disabled={isEdit}
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
                    value={userSelector.email}
                    disabled={isEdit}
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

            {/* {  CHANGE PASSWORD  } */}

            <Dialog open={openModalPassword} onClose={closeModal}>
              <Box
                width="500px"
                p={4}
                display="flex"
                flexDirection="column"
                alignItems="center"
                pb={0}
              >
                <DialogTitle variant="h5">Ganti Password</DialogTitle>
                <DialogContent>
                  <FormControl
                    fullWidth
                    error={passwordFormik.errors.oldPassword}
                  >
                    <FormLabel sx={{ fontVariant: "body1", mt: "10px" }}>
                      Password lama
                    </FormLabel>
                    <OutlinedInput
                      type="password"
                      onChange={(e) =>
                        passwordFormik.setFieldValue(
                          "oldPassword",
                          e.target.value
                        )
                      }
                    />
                    {passwordFormik.errors.oldPassword && (
                      <FormHelperText>
                        {passwordFormik.errors.oldPassword}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    fullWidth
                    error={passwordFormik.errors.newPassword}
                  >
                    <FormLabel sx={{ fontVariant: "body1", mt: "25px" }}>
                      Password baru{" "}
                      <Tooltip
                        title="Passwords should contain at least 8 characters including an uppercase letter, a symbol, and a number"
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                      >
                        <InfoIcon fontSize="small" />
                      </Tooltip>
                    </FormLabel>
                    <OutlinedInput
                      type="password"
                      onChange={(e) =>
                        passwordFormik.setFieldValue(
                          "newPassword",
                          e.target.value
                        )
                      }
                    />
                    {passwordFormik.errors.newPassword && (
                      <FormHelperText>
                        {passwordFormik.errors.newPassword}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    fullWidth
                    error={passwordFormik.errors.repeatPassword}
                  >
                    <FormLabel sx={{ fontVariant: "body1", mt: "25px" }}>
                      Ulang password baru
                    </FormLabel>
                    <OutlinedInput
                      type="password"
                      onChange={(e) =>
                        passwordFormik.setFieldValue(
                          "repeatPassword",
                          e.target.value
                        )
                      }
                    />
                    {passwordFormik.errors.repeatPassword && (
                      <FormHelperText>
                        {passwordFormik.errors.repeatPassword}
                      </FormHelperText>
                    )}
                  </FormControl>
                </DialogContent>
              </Box>
              <DialogActions sx={{ marginX: 6, marginBottom: 4, marginTop: 2 }}>
                <Button
                  variant="outlined"
                  sx={{ height: "42px", width: "120px" }}
                  onClick={closeModal}
                >
                  Batal
                </Button>
                <Button
                  autoFocus
                  variant="contained"
                  sx={{ width: "120px", height: "42px" }}
                  onClick={passwordFormik.handleSubmit}
                  disabled={passwordFormik.isSubmitting}
                >
                  Simpan
                </Button>
              </DialogActions>
            </Dialog>

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
