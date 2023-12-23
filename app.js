import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'; 

import express, { response, request } from 'express';
import pkg from 'node-wit';
const { Wit } = pkg;
const app = express();
app.use(express.json());
app.use(cors());
const accessToken = process.env.WIT_TOKEN;


  let Mainresponse = {};   //--->Main response variable 
    
  app.post('/', async (req, res) => {
    const { input } = req.body;
    try {
        const final = await handleMsg(input);
        console.log(final);

        res.json({ final });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const handleMsg = async (message) => {
    try {
        console.log('Received message:', message);
        const client = new Wit({ accessToken });
        const response = await client.message(message, {});
        if (response) {
            return handleres(response);
        }
    } catch (error) {
        console.error(error);
        throw error; // Propagate the error to the caller
    }
};
   
    
    const handleres = (response) => {
      let name = undefined;
      let confidence = 0;
      Array(response).forEach((r) => {                      //-->exatracting the Intent from wit response
        if (r.intents.length > 0) {
          name = r.intents[0].name;
          confidence = r.intents[0].confidence;
        }
    
        // console.log(name, confidence);                        
                                                              //Prompting for Intent
        switch (name) {
          case 'contact':
            return Mainresponse ={
              message:
                ' Here is some info i found - Bhuvan Geo Portal & Web Services Group (BGWSG)\nNational Remote Sensing Centre\nIndian Space Research Organisation\nGovernment of India\nHyderabad - 500 037, INDIA.\nEmail : bhuvan[at]nrsc[dot]gov[dot]in\nPhone : +91-40-2388 4588/89',
            };
          case 'info':
            return Mainresponse= { message: 'hello how can I help you? feel free to ask' };
          case 'hello':
            return ( Mainresponse = { message: `Hey! 🌟 Welcome! I'm your friendly chatbot ready to help. Feeling curious or need assistance with something  ? let's make this conversation awesome! 🚀' `})
            case 'bhuvan_aadhar_portal':
              return Mainresponse ={ message:" Sure 🌟 Here is the information I found:\t1. Bhuvan - Aadhaar Centers\n   - It shows a 3D map with all Aadhaar centers in India.\n   - You can search by pin code, area name, etc.\n  🚀 Link: [https://bhuvan-app3.nrsc.gov.in/aadhaar/]"
            }
            case 'bhu_API':
              return Mainresponse ={ message: `
              Bhuvan API enriches your applications with diverse capabilities, including proximity details, AP-specific postal and hospital information, village geocoding, thematic statistics, routing services, and access token management for authentication. The geoid services offer models representing the Earth's gravity field.
              Seamlessly integrate Bhuvan API's themes and resources into your applications for a dynamic user experience. Explore Api : (https://bhuvan-app1.nrsc.gov.in/api/#).`
            }
            case 'thanku':
              return Mainresponse ={ message:"You're very welcome! 🌟 I'm here to help. If you have any more questions or need assistance, feel free to ask. Happy to be of service!"}
              case 'agriculture_portal':
                return Mainresponse ={ message:"Sure thing!  🚜 🌻 You can explore the detailed information on Bhuvan Agriculture by visiting their official website: [Bhuvan Agriculture](https://bhuvan-app1.nrsc.gov.in/agriculture/agri.php). For insights on Chaman, Nuzividu, and Vijayawada, as well as data on crops like Mango, Banana, Citrus, Grapes, and Oilpalm, navigate through the 3D map and Land Resource Inventory. If you have any specific questions or need assistance with a particular aspect, feel free to ask!"
              }
              case 'A_P_S_portal':
                return Mainresponse ={ message: `Discover Andhra Pradesh's housing data at the State Housing portal. 🏡 Use tools like the Field Data Viewer, search by district or village, and view project details. Log in for a personalized experience. Click https://bhuvan-app1.nrsc.gov.in/apshcl/apshcl/apshcl.php to get started! 🌐
                `
              }
              case 'Bhuvan_MGNREGA':
                return Mainresponse ={ message: `Great! 🌐 Here's some valuable information on the Bhuvan-MGNREGA Geo-portal:

                [Bhuvan-MGNREGA Portal](https://bhuvan-app2.nrsc.gov.in/mgnrega/mgnrega_phase2.php)
                
                Explore a wealth of data and tools to support rural development. 🚀 To get started, log in to the portal and enter your city or coordinates. 📍 Use the tools available, and check out the Field Data Viewer for detailed insights. 🛠️ Whether you're interested in statistics, dashboards, or specific project details, the Bhuvan-MGNREGA portal has got you covered!
                
                If you have any questions or need assistance, feel free to ask. Happy exploring! 🌟` }
                case 'data_discover':
                  return Mainresponse ={ message:`Welcome to the NRSC/ISRO Open Data and Product Archive! 🌐🛰️

                  This archive facilitates users to select, browse, and download data. You can choose from different categories such as Satellite/Sensor, Theme/Products, and Program/Projects. For example, if you're interested in Resourcesat-1 or Resourcesat-2 AWiFS data, you can explore the data received from the Advanced Wide Field Sensor (AWiFS). This sensor operates in three spectral bands in VNIR and one band in SWIR, with a spatial resolution of 56 meters.
                  
                  Technical documents related to AWiFS, including brochures and user handbooks, are available for download. You can also learn about the orthorectification process.
                  
                  To select an area, use bounding box coordinates or interactive drawing. The range for selection is "66E 6N-102E 40N."
                  
                  Explore and download data  https://bhuvan-app3.nrsc.gov.in/data/
                  
                  If you have specific questions or need assistance, feel free to ask. Happy exploring! 🚀🌍
                  `
                }
                  case 'bhuvan_forum':
                return Mainresponse ={ message:  `Explore and engage with the Bhuvan Discussion Forum to stay informed and share your insights! 🌐🗣️

                You can discuss various topics, ask questions, and connect with the Bhuvan community. Here are some suggested prompts to get you started:
                
                1. "Visit the Bhuvan Discussion Forum and explore the latest updates in the Bhuvan Updates section."
                2. "Join the conversation on Bhuvan Usability to post general queries and share your thoughts."
                3. "Check out the Bhuvan 2D and Bhuvan 3D sub-forums for discussions on 2D and 3D mapping queries."
                4. "Download satellite data from the NRSC Open EO Data Archive and learn about thematic services in the respective forum sections."
                5. "Explore the Developers Section for discussions related to Bhuvan app development and map exports."
                6. "Share your wish-list and ideas in the Bhuvan Wish-list section."
                7. "Read Bhuvan Success Stories and share your own experiences with the Bhuvan community."
                
                To get started, click https://bhuvan.nrsc.gov.in/forum/ to access the Bhuvan Discussion Forum.
                
                Feel free to ask if you have specific questions or need assistance while navigating the forum. Happy discussions! 🚀🤝
                `
              }
                case 'two_d_map':
                  return Mainresponse ={ message:`Absolutely! 🌍 Explore Bhuvan's 2D map to navigate and discover places across India. Click [here](https://bhuvan-app1.nrsc.gov.in/bhuvan2d/bhuvan/bhuvan2d.php) to access the Bhuvan 2D map.

                  Whether you're planning a trip, researching locations, or simply curious about different regions in India, Bhuvan's 2D map provides a comprehensive view.
                  
                  Feel free to ask if you have specific questions or need assistance while using Bhuvan's mapping features. Happy exploring! 🗺️
                  `
                }
                case 'three_d_map':
                  return Mainresponse ={ message:`Certainly! 🌐 Experience the world in three dimensions with Bhuvan's 3D Globe. Click https://bhuvan-app1.nrsc.gov.in/globe/3d.php \t to explore Bhuvan's 3D Globe.

                  Whether you're interested in geographical features, terrain, or simply want to virtually travel across landscapes, Bhuvan's 3D Globe provides an immersive experience.
                  
                  Feel free to ask if you have specific questions or need assistance while using Bhuvan's 3D Globe. Enjoy your virtual exploration! 🌎
                  `
                }
                case 'NTR_portal':
                  return Mainresponse ={ message:`Explore healthcare options on the NTR Portal of Andhra Pradesh! 🏥 https://bhuvan-app1.nrsc.gov.in/ntr/ to search for hospitals, view profiles, and learn about healthcare schemes. Discover government and private facilities within 1 km. Log in for a personalized experience. 🌐🚀
                  `
                }
                case 'pmay':
                  return Mainresponse ={ message:`1. "Visit the PMAY webpage [here](https://bhuvan-app1.nrsc.gov.in/hfa/housing_for_all.php) for details on housing initiatives."
                  2. "Explore tools like the Field Data Viewer and links on the PMAY portal."
                  3. "Login for personalized assistance and discover housing information based on your location."
                  4. "Check the image gallery and click to view specific details. Start your housing exploration! 🏠🌐"
                  `
                }
                case 'wbis':
                  return Mainresponse ={ message:`Explore water bodies data on Bhuvan's WBIS portal [here](https://bhuvan-wbis.nrsc.gov.in/). Visualize water spread areas, download data, and understand temporal dynamics. Discover approximate volumes and learn about its evolution. Happy exploring! 🌊
                   `
                }
          default : 
               return Mainresponse ={ message : 'I did not Found any thing relevent to this request '}
        }
      });
    }
  
      app.get('/',(req,res)=>{   
                                                               //sending the final prompt to Frontend
        res.json( {Mainresponse});
        // console.log(Mainresponse);
        Mainresponse = { message : "Empty"};
        
    })
app.listen(process.env.PORT, () => {
  console.log(`Bhuvan server is live at ${process.env.PORT}`);
});