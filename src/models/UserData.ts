export default class UserData {
    private _id: number;
    private _nama: string;
    private _gender: string;
    private _job: string;
    private _noWhatsapp: number;
    private _address: string;

    constructor(id: number, nama: string, gender: string, job: string, noWhatsapp: number, address: string) {
        this._id = id;
        this._nama = nama;
        this._gender = gender;
        this._job = job;
        this._noWhatsapp = noWhatsapp;
        this._address = address;
    }

    get id() { return this._id; }
    get nama() { return this._nama; }
    get gender() { return this._gender; }
    get job() { return this._job; }
    get noWhatsapp() { return this._noWhatsapp; }
    get address() { return this._address; }

    set id(value: number) { this._id = value; }
    set nama(value: string) { this._nama = value; }
    set gender(value: string) { this._gender = value; }
    set job(value: string) { this._job = value; }
    set noWhatsapp(value: number) { this._noWhatsapp = value; }
    set address(value: string) { this._address = value; }

    toJSON(): { id: number; nama: string; gender: string; job: string; noWhatsapp: number; address: string } {
        return {
            id: this._id,
            nama: this._nama,
            gender: this._gender,
            job: this._job,
            noWhatsapp: this._noWhatsapp,
            address: this._address,
        };
    }

    static fromJSON(data: { id: number; nama: string; gender: string; job: string; noWhatsapp: number; address: string }): UserData {
        return new UserData(data.id, data.nama, data.gender, data.job, data.noWhatsapp, data.address);
    }
}