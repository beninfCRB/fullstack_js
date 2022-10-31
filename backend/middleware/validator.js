import express from "express"
import {body,validationResult} from "express-validator"

export const validate = (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.status(200).json({
        success: true,
        message: 'Successfully',
    })
}