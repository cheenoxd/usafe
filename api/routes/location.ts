import { RouteHandler } from "gadget-server";
import updateLocation from "../models/location/actions/updateLocation";

type LocationRequestBody = {
  userId: string;
  latitude: number;
  longitude: number;
};

// Route to handle location updates
const locationRoute: RouteHandler = async (req, res) => {
  try {
    // Typecast the request body
    const { userId, latitude, longitude } = req.body as LocationRequestBody;

    // Call the updateLocation action
    const updatedLocation = await updateLocation(req.context, { userId, latitude, longitude });

    // Send the response
    res.status(200).send(updatedLocation); // Use send instead of json
  } catch (error) {
    res.status(400).send({ error: "An unknown error occurred." }); // Use send instead of json
  }
};

export default locationRoute;
