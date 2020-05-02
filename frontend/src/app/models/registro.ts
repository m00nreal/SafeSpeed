export class Registro {

    constructor(_id = "", pointName = "",type = "", key = "", speed = 0, date = new Date(), image = "", plates = "")
    {
        this._id = _id;
        this.pointName = pointName;
        this.type = type;
        this.key = key;
        this.speed = speed;
        this.date = date;
        this.image = image;
        this.plates = plates;
    }

    _id : String;
    pointName: String;
    type: String;
    key: String;
    speed: Number;
    date: Date;
    image: String;
    plates: String;
}
