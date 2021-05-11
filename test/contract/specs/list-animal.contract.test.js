import { provider } from "./init-pact";
import { AnimalController } from "../../../controllers";
import {Matchers} from "@pact-foundation/pact";

describe('Given An Animal Service', () =>{ 
    beforeAll(async ()=>{
        await provider.setup();
    });

   describe('When a request to list all the animals is made', () =>{
        beforeAll(async ()=>{
            await provider.addInteraction({
                state: 'there are animals',
                uponReceiving: 'a request to get all animals',
                state:"has animals",
                withRequest: {
                    method: 'GET',
                    path: '/animals',			
                },
                willRespondWith: {
                    status:200,
                    body: Matchers.eachLike({
                        breed: Matchers.like("Bendali"),
                        gender: Matchers.like("Female"),
                        vaccinated: Matchers.boolean(true),
                        name: Matchers.string("Manchas")
                    }, {min: 1})
                }
            });
       });
        it("Then it should return the right data", async() => {
            const response = await AnimalController.list();
            expect(response.data).toMatchSnapshot();
            
            await provider.verify();
            
        });
    });
    afterAll(async ()=>{
        await provider.finalize();
    });
});
