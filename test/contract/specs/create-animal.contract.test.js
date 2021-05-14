import { provider } from "./init-pact";
import { AnimalController } from "../../../controllers";
import {Matchers} from "@pact-foundation/pact";

var pet = {
    breed: "Bendali",
    gender: "Female",
    vaccinated:true,
    name: "Other Animal"
}

describe('Given An Animal Service', () =>{ 
    beforeAll(async ()=>{
        await provider.setup();
    });

   describe('When a request the animals create', () =>{
        beforeAll(async ()=>{
            await provider.addInteraction({
                uponReceiving: 'a request to get the animal created',
                state:"create an animal",
                withRequest: {
                    method: 'POST',
                    path: '/animals',	
                    body: pet,		
                },
                willRespondWith: {
                    status:201,
                    body: Matchers.like(pet),
                }
            });
       });
        it("Then it should return the right data", async() => {
            const response = await AnimalController.register(pet);
            expect(response.data).toMatchSnapshot();        
            await provider.verify();
        });
    });
    afterAll(async ()=>{
        await provider.finalize();
    });
});