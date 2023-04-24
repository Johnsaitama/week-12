class Car {
    constructor(name){
        this.name = name;
        this.parts = [];
    }
addPart(name,area){
    this.parts.push(new Part(name,area));

    }
}
class Part {
    constructor(name,area){
        this.name = name;
        this.area = area;
    }
}

class Mechanic{
    static "https://62c85d578c90491c2cb47da3.mockapi.io/Promineo_Tech_API/cars";


    static getAllCars(){
        return $.get(this.url);
    }
    static getCars(id){
        return $.get(this.url + `/${id}`);
    }
    static createCar(car){
        return $.post(this.url, car);
        
    }
    static updateCar(car){
        return $.ajax({
            url:this.url +`/${car._id}`,
            dataType: 'json',
            data:JSON.stringify(car),
            contentType: 'application/json',
            type:'PUT'
         });
    }
static deleteCar(id){
    return $.ajax({
        url: this.url + `/${id}`,
        type: 'DELETE'

        });
    }
}

class DOMManager {
    static Garage;

    static getAllCars(){
        Mechanic.getAllCars().then(Garage => this.render(Garage))
    }

    static render(Garage){
        this.Garage = Garage;
        $("#app").empty();
        for (let car of Garage) {
            $("#app").prepend(
               `
                
                <div id= "${car._id}"class="card" 
                 <div class="card-header">
                     <h3>${car.name}</h3>
                     <div id="DateOfAppointment" class="card text-dark">Date: ${car.DateOfAppointment}</div>
                     <div id="TimeOfAppointment" class="card text-dark">Time: ${car.TimeOfAppointment}</div>
                     <div id="ServicesCompleated" class="card text-dark">Service: ${car.ServicesCompleated}</div> <br>

                     <button id="${car.id}" class="btn btn-danger" onclick="DOMManager.deleteAppointment('${car.id}')">Delete</button>
                     </div>
                     <div class="card-body">
                     <div class="card">
                     <div class="row">
                     <div class="col-sm">
                     <input type="text" id="${car._id}-part-name" class="form-control" placeholder="Part Name">
                     </div>
                    <div class"col-sm">
                    <input type="text" id="${car._id}-part-area" class="form-control" placeholder="Part Area">

                 </div>
            </div>
            <button id="${car.id}-new-car" onclick="DOMManager.addPart('${car.id}')" class="btn btn-primary form-control">Add</button>
            </div>
            </div>
            </div><br>`
            );
            for (let part of car.parts){
                $(`#${car._id}`).find('.card-body').append(
                   `<p>
                   <span id"name-${part._id}"><strong>Name: </strong> ${part._name}</span>
                   <span id"name-${part._id}"><strong>Area: </strong> ${part._area}</span>
                   <button  class="btn btn-danger" onclick="DOMManager.deletePart('${car.id}', '${part._id})">Delete Part</button>` 
                )
            }
            }
     
             
        }
    }

    DOMManager.getAllCars();




