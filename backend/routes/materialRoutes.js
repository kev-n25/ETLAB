const express = require("express");
const Material = require("../models/Material");

require("../models/Subject");
require("../models/Semester");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const materials = await Material.find()
            .populate("subject")
            .populate("semester");

        const formattedMaterials = materials.map(material => ({
            id: material._id,
            subject: material.subject.name,
            semester: `S${material.semester.semesterNumber}`,
            module: material.module,
            title: material.title,
            type: material.type,
            addedOn: new Date(material.addedOn).toLocaleDateString("en-GB"),
            file: material.file,
            description: material.description
        }));

        res.json(formattedMaterials);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch materials",
            error: error.message
        });
    }
});

router.post("/", async (req, res) => {
    try {

        const {
            subject,
            semester,
            module,
            title,
            type,
            file,
            description
        } = req.body;

        if (
            !subject ||
            !semester ||
            !module ||
            !title ||
            !type ||
            !file ||
            !description
        ) {
            return res.status(400).json({
                message: "All material fields are required"
            });
        }

        const material = await Material.create({
            subject,
            semester,
            module,
            title,
            type,
            file,
            description
        });

        res.status(201).json(material);

    } catch (error) {

        res.status(500).json({
            message: "Failed to create material",
            error: error.message
        });

    }
});

router.put("/:id", async (req, res) => {
    try {

        const { id } = req.params;

        const {
            subject,
            semester,
            module,
            title,
            type,
            file,
            description
        } = req.body;

        if (
            !subject ||
            !semester ||
            !module ||
            !title ||
            !type ||
            !file ||
            !description
        ) {
            return res.status(400).json({
                message: "All material fields are required"
            });
        }

        const material = await Material.findByIdAndUpdate(
            id,
            {
                subject,
                semester,
                module,
                title,
                type,
                file,
                description
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!material) {
            return res.status(404).json({
                message: "Material not found"
            });
        }

        res.json(material);

    } catch (error) {

        res.status(500).json({
            message: "Failed to update material",
            error: error.message
        });

    }
});

router.delete("/:id", async (req, res) => {
    try {

        const { id } = req.params;

        const material = await Material.findByIdAndDelete(id);

        if (!material) {
            return res.status(404).json({
                message: "Material not found"
            });
        }

        res.json({
            message: "Material deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to delete material",
            error: error.message
        });

    }
});

module.exports = router;