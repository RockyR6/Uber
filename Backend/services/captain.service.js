import Captain from "../models/captain.model.js";


export const createCaptain = async({
    firstname, lastname, email, password, vechicle, color, plate, capacity, vechicleType
})=>{
    if(!firstname || !email || !password || !vechicle || !color || !plate || !capacity || !vechicleType){
        throw new Error('All fields are required ')
    }
    const captain = Captain.create({
        fullname: { firstname, lastname  },
        email,
        password,
        vechicle: {
            color,
            plate,
            capacity,
            vechicleType
        }
    })
    return captain;
}

export const captainService = {
    createCaptain
}