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
  static id = 0;
  constructor(name,area,id){
      this.name = name;
      this.area = area;
   this.id = Part.id++   
  }
}

class Mechanic{
  static url ="https://64498a4ce7eb3378ca4c5a2e.mockapi.io/Car" ;


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
          url:this.url +`/${car.id}`,
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
static createCar(name){
    Mechanic.createCar(new Car(name))
    .then(() => {
        return Mechanic.getAllCars();
    })
    .then((Garage) => this.render(Garage));
}

static deleteCar(id){
Mechanic.deleteCar(id)
.then(() => { 
    return Mechanic.getAllCars();
 }) .then((Garage) => this.render(Garage));
}
static addPart(id) {
  for (let car of this.Garage){
    if (car.id == id){
      car.parts.push(new Part($(`#${car.id}-part-name`).val(), $(`#${car.id}-part-area`).val()));
      Mechanic.updateCar(car) 
      .then(() =>{
        return Mechanic.getAllCars();
      })
      .then((Garage) => this.render(Garage))
    }
  }
}
static deletePart(carId,partId){
  for(let car of this.Garage){
    if (car.id == carId){
      for(let part of car.parts){
        if (part.id == partId){
          car.parts.splice(car.parts.indexOf(part), 1);
          Mechanic.updateCar(car)
          .then(() => {
            return Mechanic.getAllCars();
          })
          .then((Garage) => this.render(Garage));
        }
      }
    }
  }
}

  static render(Garage){
      this.Garage = Garage;
      $("#app").empty();
      for (let car of Garage) {
        console.log(Garage)
          $("#app").prepend(
             `
              
              <div id= "${car.id}"class="card"> 
               <div class="card-header">
               
                   <h3>${car.name}</h3>
                  
                   <button id="${car.id}" class="btn btn-danger" onclick="DOMManager.deleteAppointment('${car.id}')">Delete</button>
                   </div>
                   <div class="card-body">
                   <div class="card">
                   <div class="row">
                   <div class="col-sm">
                   <input type="text" id="${car.id}-part-name" class="form-control" placeholder="Part Name">
                   </div>
                  <div class"col-sm">
                  <input type="text" id="${car.id}-part-area" class="form-control" placeholder="Part Area">

               </div>
          </div>
          <button id="${car.id}-new-car" onclick="DOMManager.addPart('${car.id}')"class="btn btn-primary form-control">Add</button>
          </div>
          </div>
          </div><br>`
          );
          for (let part of car.parts){
            console.log(car.parts)
              $(`#${car.id}`).find('.card-body').append(
                 `<p>
                 <span id"name-${part.id}"><strong>Name: </strong> ${part.name}</span>
                 <span id"name-${part.id}"><strong>Area: </strong> ${part.area}</span>
                 <button  class="btn btn-danger" onclick="DOMManager.deletePart('${car.id}', '${part.id}')">Delete Part</button>` 

              )
          }
          }
   
           
      }
  }
$('#create-new-car').click(() => {
    DOMManager.createCar($('#new-car-name').val());
    $('#new-car-name').val('');
});
  DOMManager.getAllCars();

