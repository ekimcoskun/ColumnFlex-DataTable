import DataTable, { TColumn } from "./components/DataTable/DataTable";

type DataType = {
  name: string;
  surname: string;
  age: number;
  email: string;
  phone: string;
  address?: string;
  city: string;
  state?: string;
  country: string;
  postal?: string;
  company?: string;
  job?: string;
};

function App() {
  const data: DataType[] = [
    {
      name: "Albertine",
      surname: "Rickeard",
      age: 70,
      email: "arickeard0@meetup.com",
      phone: "341-798-9523",
      city: "Jubao",
      state: null,
      country: "China",
      postal: null,
      company: "Skynoodle",
      job: "Software Consultant",
    },
    {
      name: "Caralie",
      surname: "Custed",
      age: 78,
      email: "ccusted1@printfriendly.com",
      phone: "411-202-3215",
      city: "Alvaro Obregon",
      state: "Puebla",
      country: "Mexico",
      postal: "74060",
      company: "Yotz",
      job: "Human Resources Assistant I",
    },
    {
      name: "Crystal",
      surname: "Gerritzen",
      age: 41,
      email: "cgerritzen2@edublogs.org",
      phone: "707-760-6219",
      city: "Yangiobod",
      state: null,
      country: "Uzbekistan",
      postal: null,
      company: "Zoozzy",
      job: "Automation Specialist II",
    },
    {
      name: "Desiree",
      surname: "Banker",
      age: 69,
      email: "dbanker3@t-online.de",
      phone: "379-522-0355",
      city: "Yur’yev-Pol’skiy",
      state: null,
      country: "Russia",
      postal: "601800",
      company: "Jamia",
      job: "Database Administrator III",
    },
    {
      name: "Miller",
      surname: "Crump",
      age: 60,
      email: "mcrump4@techcrunch.com",
      phone: "677-294-4817",
      city: "Los Palacios",
      state: null,
      country: "Cuba",
      postal: null,
      company: "Gigaclub",
      job: "Web Designer III",
    },
    {
      name: "Chickie",
      surname: "Ram",
      age: 13,
      email: "cram5@dropbox.com",
      phone: "118-785-6054",
      city: "Reims",
      state: "Champagne-Ardenne",
      country: "France",
      postal: "51074 CEDEX",
      company: "Meevee",
      job: "Senior Developer",
    },
    {
      name: "Geri",
      surname: "Denerley",
      age: 58,
      email: "gdenerley6@unesco.org",
      phone: "469-156-0069",
      city: "Władysławowo",
      state: null,
      country: "Poland",
      postal: "84-120",
      company: "Brainlounge",
      job: "Legal Assistant",
    },
    {
      name: "Kassandra",
      surname: "Onge",
      age: 92,
      email: "konge7@comcast.net",
      phone: "257-566-5580",
      city: "Sorang",
      state: null,
      country: "Kazakhstan",
      postal: null,
      company: "Bluejam",
      job: "Staff Scientist",
    },
    {
      name: "Rudd",
      surname: "Piatek",
      age: 98,
      email: "rpiatek8@merriam-webster.com",
      phone: "352-188-4090",
      city: "Gainesville",
      state: "Florida",
      country: "United States",
      postal: "32627",
      company: "Eadel",
      job: "Assistant Manager",
    },
    {
      name: "Dorice",
      surname: "Brecken",
      age: 53,
      email: "dbrecken9@google.co.jp",
      phone: "569-323-0280",
      city: "Molodohvardiys’k",
      state: null,
      country: "Ukraine",
      postal: null,
      company: "Mydeo",
      job: "Assistant Professor",
    },
  ];
  const columns: TColumn[] = [
    { id: 0, name: "Name", selector: (row) => <p>{row.name}</p> },
    { id: 1, name: "Surname", selector: (row) => <p>{row.surname}</p> },
    { id: 2, name: "Age", selector: (row) => <p>{row.age}</p> },
    { id: 3, name: "Email", selector: (row) => <p>{row.email}</p> },
    { id: 4, name: "Phone", selector: (row) => <p>{row.phone}</p> },
    { id: 5, name: "Address", selector: (row) => <p>{row.address}</p> },
    { id: 6, name: "City", selector: (row) => <p>{row.city}</p> },
    { id: 7, name: "State", selector: (row) => <p>{row.state}</p> },
    { id: 8, name: "Country", selector: (row) => <p>{row.country}</p> },
    { id: 9, name: "Postal", selector: (row) => <p>{row.postal}</p> },
    {
      id: 10,
      name: "Company",
      selector: (row) => <p>{row.company}</p>,
    },
    { id: 11, name: "Job", selector: (row) => <p>{row.job}</p> },
  ];
  return (
    <div>
      <DataTable tableKey={"demoTable"} columns={columns} data={data} filter />
    </div>
  );
}

export default App;
