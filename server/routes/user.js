import express from "express";
import {getUser, updateUser, deleteUser} from "../controlles/user.js";
import {verifyToken} from "../middleware/auth.js";
