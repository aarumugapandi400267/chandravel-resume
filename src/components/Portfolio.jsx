/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
    Card, CardContent, Typography, Button, Grid, Container, Box,
    Link as MuiLink, Chip, Stack, Avatar, Divider, IconButton
} from "@mui/material";
import { Github, Linkedin, Mail, Globe, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const getTheme = (mode) => createTheme({
    palette: {
        mode,
        background: {
            default: mode === "dark" ? "#181a20" : "#f5f7fa",
            paper: mode === "dark" ? "#23272f" : "#fff"
        },
        text: {
            primary: mode === "dark" ? "#fff" : "#181a20",
            secondary: mode === "dark" ? "#b0b3b8" : "#555"
        },
        primary: {
            main: "#2196f3"
        },
        secondary: {
            main: "#ff4081"
        }
    }
});

export default function Portfolio() {
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [experience, setExperience] = useState([]);
    const [education, setEducation] = useState([]);
    const [contact, setContact] = useState({ address: "", phone: "", email: "" });
    const [themeMode, setThemeMode] = useState("light");
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [profileImage, setProfileImage] = useState(true);

    const domain = ""
    // const domain = "https://aarumugapandi400267.github.io/Inner-Peace"

    useEffect(() => {
        console.log(profile)
        fetch(profile.profileImage)
            .then((res) => res.blob())
            .then((blob) => {
                setProfileImage(URL.createObjectURL(blob));
            });
    },[profile])

    useEffect(() => {
        const fetchData = async () => {
            await fetch(domain + "/data/projects.json").then(res => res.json()).then(setProjects);
            await fetch(domain + "/data/skills.json").then(res => res.json()).then(setSkills);
            await fetch(domain + "/data/certifications.json").then(res => res.json()).then(setCertifications);
            await fetch(domain + "/data/experience.json").then(res => res.json()).then(setExperience);
            await fetch(domain + "/data/education.json").then(res => res.json()).then(setEducation);
            await fetch(domain + "/data/contact.json").then(res => res.json()).then(setContact);
            await fetch(domain + "/data/profile.json").then(res => res.json()).then((data) => { setProfile(data) })
            setLoading(false);
        };
        fetchData();
    }, []);

    const theme = getTheme(themeMode);

    // Set body background according to theme
    React.useEffect(() => {
        document.body.style.backgroundColor = theme.palette.background.default;
        document.body.style.color = theme.palette.text.primary;
    }, [themeMode, theme.palette.background.default, theme.palette.text.primary]);

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: theme.palette.background.default,
                    color: theme.palette.text.primary
                }}
            >
                <CircularProgress color="primary" size={64} />
            </Box>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Container
                maxWidth="lg"
                sx={{
                    py: 10,
                    bgcolor: "background.default",
                    minHeight: "100vh",
                    px: { xs: 2, sm: 4, md: 8 }
                }}
            >
                {/* Theme Switch Button */}
                <Box sx={{ position: "fixed", top: 24, right: 32, zIndex: 1000 }}>
                    <IconButton
                        color="primary"
                        onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
                        aria-label="Toggle theme"
                        size="large"
                    >
                        {themeMode === "dark" ? <Sun /> : <Moon />}
                    </IconButton>
                </Box>
                <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <Box textAlign="center" mb={10}>
                        <Avatar
                            src={profileImage}
                            alt="Profile Photo"
                            sx={{
                                width: 220,
                                height: 220,
                                mx: "auto",
                                mb: 3,
                                border: '3px solid #2196f3'
                            }}
                        />
                        <Typography variant="h3" fontWeight="bold" gutterBottom color="text.primary">
                            {profile.name}
                        </Typography>
                        <Typography variant="h5" color="primary.main" fontWeight="medium">
                            {profile.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mt={2}>
                            {contact.address}<br />📞 {contact.phone} | ✉️ {contact.email}
                        </Typography>
                        <Stack direction="row" justifyContent="center" spacing={3} mt={3}>
                            <MuiLink href={`mailto:${contact.email}`} target="_blank" color="inherit">
                                <Mail color={themeMode === "dark" ? "#fff" : undefined} />
                            </MuiLink>
                            <MuiLink href={profile.social.github} target="_blank" color="inherit">
                                <Github color={themeMode === "dark" ? "#fff" : undefined} />
                            </MuiLink>
                            <MuiLink href={profile.social.linkedin} target="_blank" color="inherit">
                                <Linkedin color={themeMode === "dark" ? "#fff" : undefined} />
                            </MuiLink>
                            <MuiLink href={profile.social.website} target="_blank" color="inherit">
                                <Globe color={themeMode === "dark" ? "#fff" : undefined} />
                            </MuiLink>
                        </Stack>
                    </Box>
                </motion.div>

                <Divider sx={{ my: 5, bgcolor: "primary.main" }} />

                {/* Experience */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.2 }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Box component="section" mb={10}>
                            <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
                                Experience
                            </Typography>
                            <Stack spacing={4}>
                                {experience.map((item, idx) => (
                                    <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }}>
                                        <Box p={3} borderRadius={2} bgcolor="background.paper">
                                            <Typography variant="subtitle1" fontWeight="bold" color="text.primary">{item.role}</Typography>
                                            <Typography variant="body2" color="text.secondary">{item.company} | {item.duration}</Typography>
                                            <Typography variant="body2" mt={1} color="text.secondary">
                                                {item.description.split('\n').map((line, idx) => (
                                                    <span key={idx}>
                                                        {line}
                                                        <br />
                                                    </span>
                                                ))}
                                            </Typography>                                        </Box>
                                    </motion.div>
                                ))}
                            </Stack>
                        </Box>
                    </motion.div>

                    {/* Education */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Box component="section" mb={10}>
                            <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
                                Education
                            </Typography>
                            <Stack spacing={4}>
                                {education.map((edu, idx) => (
                                    <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }}>
                                        <Box p={3} borderLeft={"4px solid #1976d2"} bgcolor="background.paper">
                                            <Typography variant="subtitle1" fontWeight="bold" color="text.primary">{edu.degree}</Typography>
                                            <Typography variant="body2" color="text.secondary">{edu.institution} | {edu.duration}</Typography>
                                            <Typography variant="body2" mt={1} color="text.secondary">{edu.details}</Typography>
                                        </Box>
                                    </motion.div>
                                ))}
                            </Stack>
                        </Box>
                    </motion.div>
                </motion.div>

                {/* Skills */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <Box component="section" mb={10}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
                            Skills
                        </Typography>
                        <Grid container spacing={3} sx={{ display: "flex", flexDirection: "column" }}>
                            {skills.map((skill, idx) => (
                                <Grid item xs={12} sm={6} md={4} key={idx}>
                                    <Box>
                                        <Typography variant="body1" fontWeight="medium" gutterBottom color="text.primary">
                                            {skill.name} {skill.level && `– ${skill.level}`}
                                        </Typography>
                                        <Stack direction="row" spacing={1} flexWrap="wrap">
                                            {skill.keywords?.map((keyword, kIdx) => (
                                                <Chip key={kIdx} label={keyword} variant="outlined" color="primary" />
                                            ))}
                                        </Stack>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </motion.div>

                {/* Certifications */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <Box component="section" mb={10}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
                            Certifications
                        </Typography>
                        <Stack spacing={3}>
                            {certifications.map((cert, idx) => (
                                <Box key={idx}>
                                    <Typography variant="body1" fontWeight="medium" color="text.primary">
                                        {cert.title} – {cert.issuer}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {cert.date}
                                    </Typography>
                                    {cert.url && (
                                        <MuiLink href={cert.url} target="_blank" rel="noopener noreferrer" color="primary">
                                            View Certificate
                                        </MuiLink>
                                    )}
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </motion.div>

                {/* Projects */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <Box component="section" mb={10}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom align="center" color="text.primary">
                            Featured Projects
                        </Typography>
                        <Grid container spacing={4}>
                            {projects.map((project, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index} width="100%">
                                    <Card sx={{
                                        height: "100%",
                                        borderLeft: "5px solid #1976d2",
                                        bgcolor: "background.paper",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between"
                                    }}>
                                        <CardContent>
                                            <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                                                {project.title}
                                                {project.repo && (
                                                    <IconButton
                                                        color="primary"
                                                        sx={{ mt: 1, color: "#2196f3" }}
                                                        href={project.repo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label="GitHub Repository"
                                                    >
                                                        <Github color={themeMode === "dark" ? "#fff" : undefined} />
                                                    </IconButton>
                                                )}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                {project.description}
                                            </Typography>
                                            {/* Show status chip if available */}
                                            {project.status && (
                                                <Chip
                                                    label={project.status}
                                                    color={project.status === "Completed" ? "success" : "warning"}
                                                    size="small"
                                                    sx={{ mb: 1 }}
                                                />
                                            )}

                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </motion.div>

                {/* Contact */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <Box textAlign="center" component="section" py={5} bgcolor="background.paper" borderRadius={3}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
                            Let's Work Together
                        </Typography>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                            Open to full-time roles, freelance projects, and collaborations.
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            href={`mailto:${contact.email}`}
                        >
                            Contact Me
                            {/* {profile.buttons.contactMe} */}
                        </Button>
                    </Box>
                </motion.div>
            </Container>
        </ThemeProvider>
    );
}
