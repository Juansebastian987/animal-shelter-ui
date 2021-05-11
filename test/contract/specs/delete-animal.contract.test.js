import { provider } from "./init-pact";
import { AnimalController } from "../../../controllers";
import {Matchers} from "@pact-foundation/pact";

describe('Given An Animal Service', () =>{ 
    beforeAll(async ()=>{
        await provider.setup();
    });

   describe('When a request the animals create', () =>{
        beforeAll(async ()=>{
            await provider.addInteraction({
                uponReceiving: 'a request to delete the animal created',
                state:"delete an animal",
                withRequest: {
                    method: 'DELETE',
                    path: '/animals/OtherAnimal',			
                },
                willRespondWith: {
                    status:204
                }
            });
       });
        it("Then it should return the right data", async() => {
            const response = await AnimalController.delete("OtherAnimal");
            expect(response.data).toMatchSnapshot();
            
            await provider.verify();
            
        });
    });
    afterAll(async ()=>{
        await provider.finalize();
    });
});