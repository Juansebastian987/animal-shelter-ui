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
                state: 'there an animal',
                uponReceiving: 'a request to get the animal created',
                state:"has an animal",
                withRequest: {
                    method: 'POST',
                    path: '/animals',			
                },
                willRespondWith: {
                    status:201,
                    body: Matchers.eachLike({
                        breed: Matchers.like("Bendali"),
                        gender: Matchers.like("Female"),
                        vaccinated: Matchers.boolean(true),
                        name: Matchers.string("Other Animal")
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