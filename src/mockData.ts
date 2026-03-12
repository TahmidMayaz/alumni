import { Student, Batch } from './types';

const sessions = ['2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24', '2024-2025'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const workplaces = [
  'Tesla (Robotics)', 'Boston Dynamics', 'ABB Automation', 'Siemens', 'Fanuc', 
  'Local Tech Startup', 'KUET Research Lab', 'Higher Studies (MIT)', 
  'Automation Engineer', 'Embedded Systems Dev', 'Mechatronics Specialist'
];

const generateMockStudents = (session: string, count: number): Student[] => {
  const existingNicknames = new Set<string>();

  const getNickname = (fullName: string): string => {
    const forbidden = ['md', 'md.', 'mohammad', 'muhammod', 'mohammod', 'sk', 'sk.', 'junaid', 'islam', 'md.'];
    const parts = fullName.split(' ').filter(p => {
      const lower = p.replace(/[.,]/g, '').toLowerCase();
      return !forbidden.includes(lower) && p.length > 2;
    });
    
    if (parts.length === 0) return fullName.split(' ')[0];

    for (const part of parts) {
      if (!existingNicknames.has(part)) {
        existingNicknames.add(part);
        return part;
      }
    }
    
    // If all parts are taken, try combining? Or just use the last one
    return parts[parts.length - 1];
  };

  const students = Array.from({ length: count }, (_, i) => {
    const name = `Student ${i + 1}`;
    const roll = `${session.split('-')[0].slice(-2)}31${(i + 1).toString().padStart(3, '0')}`;
    return {
      id: `${session}-${i + 1}`,
      name,
      nickname: name,
      session,
      roll,
      email: `student${i + 1}.${session.replace('-', '')}@example.com`,
      phone: `+880 1${Math.floor(Math.random() * 900000000 + 100000000)}`,
      bloodGroup: bloodGroups[Math.floor(Math.random() * bloodGroups.length)],
      currentWorkplace: session === '2023-24' ? 'Undergraduate Student' : workplaces[Math.floor(Math.random() * workplaces.length)],
      photoUrl: `/${roll}.jpg`,
      hometown: "Khulna, Bangladesh",
      bio: "Passionate about technology and building impactful solutions.",
      linkedin: "https://linkedin.com/in/username"
    };
  });

  if (session === '2023-24') {
    const specificStudents: Partial<Student>[] = [
      {
        name: "Rafiad Haque",
        photoUrl: "https://i.imgur.com/UGgj0gP.png",
        bio: "The only way to do great work is to love what you do.",
        currentWorkplace: "student (23-24 session)",
        phone: "01318425741",
        email: "rafiad.haque@example.com",
        linkedin: "N/A"
      },
      {
        name: "Bulbul Ahmed",
        photoUrl: "https://i.imgur.com/7lPa3bi.png",
        bio: "Innovation distinguishes between a leader and a follower.",
        currentWorkplace: "student",
        phone: "01309348820",
        email: "bulbul.ahmed@example.com",
        linkedin: "N/A"
      },
      {
        name: "Nasheikh Mohammad Rafiul",
        photoUrl: "https://i.imgur.com/EXYWbOF.png",
        bio: "Stay hungry, stay foolish.",
        currentWorkplace: "student",
        phone: "01706209577",
        email: "rafiul.m@example.com",
        linkedin: "N/A"
      },
      {
        name: "MD Ajimul Haque Siam",
        photoUrl: "https://i.imgur.com/6d9z1bD.png",
        bio: "Your time is limited, so don't waste it living someone else's life.",
        currentWorkplace: "student",
        phone: "01522104628",
        email: "ajimul.siam@example.com",
        linkedin: "N/A"
      },
      {
        name: "partho kumar Vhadro",
        photoUrl: "https://i.imgur.com/vOosMhl.png",
        bio: "Design is not just what it looks like and feels like. Design is how it works.",
        currentWorkplace: "student",
        phone: "01595687480",
        email: "partho.vhadro@example.com",
        linkedin: "N/A"
      },
      {
        name: "Rahat Bin Kabir",
        photoUrl: "https://i.imgur.com/3MIWu9c.png",
        bio: "The future belongs to those who believe in the beauty of their dreams.",
        currentWorkplace: "student",
        phone: "01624059845",
        email: "rahat.kabir@example.com",
        linkedin: "N/A"
      },
      {
        name: "Amitav Mim",
        photoUrl: "https://i.imgur.com/vsSDNcB.png",
        bio: "Believe you can and you're halfway there.",
        currentWorkplace: "student",
        phone: "01572905620",
        email: "amitav.mim@example.com",
        linkedin: "N/A"
      },
      {
        name: "Sanim",
        photoUrl: "https://i.imgur.com/nZc6Nwk.png",
        bio: "It does not matter how slowly you go as long as you do not stop.",
        currentWorkplace: "student",
        phone: "01580679509",
        email: "sanim@example.com",
        linkedin: "N/A"
      },
      {
        name: "Tahmid Mayaz",
        photoUrl: "/2331009.jpg",
        bio: "Everything you've ever wanted is on the other side of fear.",
        currentWorkplace: "student",
        phone: "01748700753",
        email: "tahmid.mayaz@example.com",
        linkedin: "N/A"
      },
      {
        name: "Sameer Khan",
        photoUrl: "https://i.imgur.com/1L12IVd.png",
        bio: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        currentWorkplace: "student",
        phone: "01799946101",
        email: "sameer.khan@example.com",
        linkedin: "N/A"
      },
      {
        name: "Suvrodeb Kundu",
        photoUrl: "https://i.imgur.com/f8trMjG.png",
        bio: "Hardships often prepare ordinary people for an extraordinary destiny.",
        currentWorkplace: "student",
        phone: "01887078337",
        email: "suvrodeb.kundu@example.com",
        linkedin: "N/A"
      },
      {
        name: "SK Adi",
        photoUrl: "https://i.imgur.com/JZsMNnW.png",
        bio: "Dream big and dare to fail.",
        currentWorkplace: "student",
        phone: "01703034014",
        email: "sk.adi@example.com",
        linkedin: "N/A"
      },
      {
        name: "Sumiya Khatun",
        photoUrl: "https://picsum.photos/seed/sumiya/400/400",
        bio: "The only limit to our realization of tomorrow will be our doubts of today.",
        currentWorkplace: "Student",
        phone: "n/a",
        email: "sumiya.k@example.com",
        linkedin: "N/A"
      },
      {
        name: "Mohammod Junaid Islam Nafi",
        photoUrl: "https://i.imgur.com/e7gltBT.png",
        bio: "Keep your face always toward the sunshine - and shadows will fall behind you.",
        currentWorkplace: "student",
        phone: "01824368766",
        email: "junaid.nafi@example.com",
        linkedin: "N/A"
      },
      {
        name: "Mahdi Hassan",
        photoUrl: "https://i.imgur.com/H0B48BS.png",
        bio: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        currentWorkplace: "Student",
        phone: "01324082511",
        email: "mahdi.hassan@example.com",
        linkedin: "N/A"
      },
      {
        name: "Md Shadhin Sheikh",
        photoUrl: "https://i.imgur.com/EVxpIdQ.png",
        bio: "The best way to predict the future is to invent it.",
        currentWorkplace: "student",
        phone: "01302195851",
        email: "shadhin.sheikh@example.com",
        linkedin: "N/A"
      },
      {
        name: "Suraya Jim",
        photoUrl: "https://picsum.photos/seed/suraya/400/400",
        bio: "You are never too old to set another goal or to dream a new dream.",
        currentWorkplace: "student",
        phone: "n/a",
        email: "suraya.jim@example.com",
        linkedin: "N/A"
      },
      {
        name: "Dibya Jyoti Das",
        photoUrl: "https://i.imgur.com/ETh2VcS.png",
        bio: "Act as if what you do makes a difference. It does.",
        currentWorkplace: "student",
        phone: "01745451188",
        email: "dibya.das@example.com",
        linkedin: "N/A"
      },
      {
        name: "Jagannath Das",
        photoUrl: "https://i.imgur.com/tbhLxer.png",
        bio: "Success is walking from failure to failure with no loss of enthusiasm.",
        currentWorkplace: "student",
        phone: "01991844457",
        email: "jagannath.das@example.com",
        linkedin: "N/A"
      },
      {
        name: "Muhammod Mubin",
        photoUrl: "https://i.imgur.com/B98ItzX.png",
        bio: "The only person you are destined to become is the person you decide to be.",
        currentWorkplace: "student",
        phone: "01407922154",
        email: "mubin@example.com",
        linkedin: "N/A"
      },
      {
        name: "Umme Jiban Fateha",
        photoUrl: "https://picsum.photos/seed/fateha/400/400",
        bio: "Don't watch the clock; do what it does. Keep going.",
        currentWorkplace: "student",
        phone: "n/a",
        email: "fateha@example.com",
        linkedin: "N/A"
      },
      {
        name: "MD Mohasin Morol",
        photoUrl: "https://i.imgur.com/lHscDzy.png",
        bio: "You define your own life. Don't let other people write your script.",
        currentWorkplace: "student",
        phone: "01615773415",
        email: "mohasin.morol@example.com",
        linkedin: "N/A"
      },
      {
        name: "Md. Rifakat Azad Sian",
        photoUrl: "https://i.imgur.com/Hmiqs94.png",
        bio: "You are enough just as you are.",
        currentWorkplace: "student",
        phone: "01778385508",
        email: "rifakat.sian@example.com",
        linkedin: "N/A"
      },
      {
        name: "Fardin Rafi",
        photoUrl: "https://i.imgur.com/y9MlsbE.png",
        bio: "The bad news is time flies. The good news is you're the pilot.",
        currentWorkplace: "student",
        phone: "01751723292",
        email: "fardin.rafi@example.com",
        linkedin: "N/A"
      },
      {
        name: "Mahdi Al Islam",
        photoUrl: "https://i.imgur.com/mEFQEkU.png",
        bio: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
        currentWorkplace: "Student",
        phone: "01634202129",
        email: "mahdi.al@example.com",
        linkedin: "N/A"
      },
      {
        name: "Sabid Hasan Shoeb",
        photoUrl: "https://i.imgur.com/KLJtcVH.png",
        bio: "In the end, it's not the years in your life that count. It's the life in your years.",
        currentWorkplace: "Student",
        phone: "01992769178",
        email: "sabid.shoeb@example.com",
        linkedin: "N/A"
      },
      {
        name: "Samia",
        photoUrl: "https://picsum.photos/seed/samia/400/400",
        bio: "The power of imagination makes us infinite.",
        currentWorkplace: "Student",
        phone: "n/a",
        email: "samia@example.com",
        linkedin: "N/A"
      },
      {
        name: "MD Foysal Ahmed",
        photoUrl: "https://i.imgur.com/iJKMLWQ.png",
        bio: "Life is what happens when you're busy making other plans.",
        currentWorkplace: "student",
        phone: "01824152000",
        email: "foysal.ahmed@example.com",
        linkedin: "N/A"
      }
    ];

    return specificStudents.map((specific, i) => {
      let rollNumber = i + 1;
      if (i >= 19) {
        rollNumber = i + 2;
      }
      const fullName = specific.name || `Student ${i + 1}`;
      const roll = `${session.split('-')[0].slice(-2)}31${rollNumber.toString().padStart(3, '0')}`;
      return {
        id: `${session}-${i + 1}`,
        session,
        nickname: getNickname(fullName),
        roll,
        bloodGroup: bloodGroups[Math.floor(Math.random() * bloodGroups.length)],
        hometown: "Khulna, Bangladesh",
        ...specific,
        photoUrl: `/${roll}.jpg`
      };
    }) as Student[];
  }

  if (session === '2024-2025') {
    const specificStudents: Partial<Student>[] = [
      {
        name: "Taufiqur Rahman",
        nickname: "Taufiq",
        email: "rahman2431020@stud.kuet.ac.bd",
        hometown: "Magura",
        roll: "2431020",
        bloodGroup: "O+",
        phone: "01410828347",
        linkedin: "https://www.linkedin.com/in/taufiqur-rahman-233a3838a/",
        bio: "Everybody in this country should learn how to program a computer, because it teaches you how to think. - Steven Paul Jobs",
        currentWorkplace: "Student"
      },
      {
        name: "Sayed Mohammad Nihal",
        nickname: "Nihal",
        email: "nihal2431004@stud.kuet.ac.bd",
        hometown: "Chattogram",
        roll: "2431004",
        bloodGroup: "N/A",
        phone: "01615897432",
        linkedin: "N/A",
        bio: "N/A",
        currentWorkplace: "Student"
      },
      {
        name: "Md.Mubashshir Murshed",
        nickname: "Murshed",
        email: "murshedifty21@gmail.com",
        hometown: "Munshiganj",
        roll: "2431008",
        bloodGroup: "O-",
        phone: "01328954565",
        linkedin: "https://www.linkedin.com/in/mubashshir-murshed-ifty-1149a4372",
        bio: "N/A",
        currentWorkplace: "Student"
      },
      {
        name: "Arefin Masuk",
        nickname: "Arefin",
        email: "masukarefin@yahoo.com",
        hometown: "Kushtia",
        roll: "2431001",
        bloodGroup: "A+",
        phone: "01521000000",
        linkedin: "https://www.linkedin.com/in/arefinmasuk10/",
        bio: "Seeking the possibility.",
        currentWorkplace: "Student"
      },
      {
        name: "Ashek Mohammad Abir Hasan",
        nickname: "Ashek",
        email: "hasan2431018@stud.kuet.ac.bd",
        hometown: "Sherpur",
        roll: "2431018",
        bloodGroup: "O+",
        phone: "01946278018",
        linkedin: "N/A",
        bio: "N/A",
        currentWorkplace: "Student"
      },
      {
        name: "Muhammad Khaleed Bin Huda",
        nickname: "Khaleed",
        email: "khaleedbinhuda@gmail.com",
        hometown: "Rajshahi",
        roll: "2431013",
        bloodGroup: "A+",
        phone: "0522134651",
        linkedin: "N/A",
        bio: "Only in their dreams can men be truly free. ’Twas always thus, and always thus will be.",
        currentWorkplace: "Student"
      },
      {
        name: "Rawnok Alam Dipto",
        nickname: "Dipto",
        email: "alamdipto0@gmail.com",
        hometown: "Dhaka",
        roll: "2431010",
        bloodGroup: "A+",
        phone: "01521787865",
        linkedin: "https://www.linkedin.com/in/rawnok-alam-dipto-mte",
        bio: "N/A",
        currentWorkplace: "Student"
      },
      {
        name: "Dibonhita Bonhi",
        nickname: "Bonhi",
        email: "dibonhitabonhi@gmail.com",
        hometown: "Khulna",
        roll: "2431026",
        bloodGroup: "O+",
        phone: "01346884849",
        linkedin: "N/A",
        bio: "N/A",
        currentWorkplace: "Student"
      },
      {
        name: "MD. MUNTASIR MUKIM",
        nickname: "MUKIM",
        email: "muntasirmukim26472@gmail.com",
        hometown: "Faridpur",
        roll: "2431029",
        bloodGroup: "O+",
        phone: "01881748289",
        linkedin: "N/A",
        bio: "N/A",
        currentWorkplace: "Student"
      },
      {
        name: "Joydip Chowdhury",
        nickname: "Joydip",
        email: "cjoydip29@gmail.com",
        hometown: "Chattogram",
        roll: "2431005",
        bloodGroup: "O+",
        phone: "01622989986",
        linkedin: "https://bd.linkedin.com/in/joydip-chowdhury-4583843a5",
        bio: "Switching to your pistol is always faster than reloading",
        currentWorkplace: "Student"
      },
      {
        name: "Hemel Mondal",
        nickname: "Hemel",
        email: "hemelmondal0987@gmail.com",
        hometown: "jashore",
        roll: "2431023",
        bloodGroup: "O+",
        phone: "01600624312",
        linkedin: "https://www.linkedin.com/in/hemel-mondal-071a73364",
        bio: "N/A",
        currentWorkplace: "Student"
      },
      {
        name: "Md. Golam Rofiul Roke",
        nickname: "Rocky",
        email: "rokemdgolamrofiul@gmail.com",
        hometown: "Jamalpur",
        roll: "2431028",
        bloodGroup: "O+",
        phone: "01600110425",
        linkedin: "N/A",
        bio: "N/A",
        currentWorkplace: "Student"
      },
      {
        name: "Oyshi Baria Prite",
        nickname: "Oyshi",
        email: "prite2431019@stud.kuet.ac.bd",
        hometown: "Naogaon",
        roll: "2431019",
        bloodGroup: "A+",
        phone: "01303694827",
        linkedin: "N/A",
        bio: "N/A",
        currentWorkplace: "Student"
      },
      {
        name: "Tamzid Hossain Raj",
        nickname: "Raj",
        email: "raj2431024@stud.kuet.ac.bd",
        hometown: "Satkhira",
        roll: "2431024",
        bloodGroup: "O+",
        phone: "01968332388",
        linkedin: "N/A",
        bio: "And they planed and Allah also planed, Allah is the best of planners – Al' Imran_54",
        currentWorkplace: "Student"
      },
      {
        name: "MD.LIMON HOWLADER",
        nickname: "Limon",
        email: "mohammadlimon376@gmail.com",
        hometown: "Barishal",
        roll: "2431015",
        bloodGroup: "O+",
        phone: "01916319837",
        linkedin: "N/A",
        bio: "N/A",
        currentWorkplace: "Student"
      },
      {
        name: "MD. SAIFULLAH MAHFUZ",
        nickname: "MAHFUZ",
        email: "mahfuz2431007@stud.kuet.ac.bd",
        hometown: "Chapainawabganj",
        roll: "2431007",
        bloodGroup: "A-",
        phone: "01767227928",
        linkedin: "https://www.linkedin.com/in/md-saifullah-mahfuz-ab520a298",
        bio: "Effortless is a myth",
        currentWorkplace: "Student"
      },
      {
        name: "I. N. M. Hasib",
        nickname: "Hasib",
        email: "hasib2431017@stud.kuet.ac.bd",
        hometown: "Bogura",
        roll: "2431017",
        bloodGroup: "O+",
        phone: "01853710973",
        linkedin: "https://www.linkedin.com/in/i-n-m-hasib-7b018736b",
        bio: "Hesitation is defeat",
        currentWorkplace: "Student"
      },
      {
        name: "MD. Tanjim Ahsan Limon",
        nickname: "Tanjim",
        email: "ahsanlimon560@gmail.com",
        hometown: "Jhenaidah",
        roll: "2431016",
        bloodGroup: "O+",
        phone: "01570290056",
        linkedin: "N/A",
        bio: "N/A",
        currentWorkplace: "Student"
      },
      {
        name: "Ifty Rahman",
        nickname: "Ifty",
        email: "ifty.3589@gmail.com",
        hometown: "Chapai Nawabganj",
        roll: "2431009",
        bloodGroup: "O+",
        phone: "01682997301",
        linkedin: "N/A",
        bio: "N/A",
        currentWorkplace: "Student"
      },
      {
        name: "Anika Begum",
        nickname: "Anika",
        email: "begum2431022@stud.kuet.ac.bd",
        hometown: "Sylhet",
        roll: "2431022",
        bloodGroup: "AB+",
        phone: "01791917313",
        linkedin: "N/A",
        bio: "N/A",
        currentWorkplace: "Student"
      },
      {
        name: "Md.Fahaduzzaman Fahim",
        nickname: "Fahim",
        email: "fahim2431014@stud.kuet.ac.bd",
        hometown: "Narayanganj",
        roll: "2431014",
        bloodGroup: "O+",
        phone: "01401276646",
        linkedin: "N/A",
        bio: "N/A",
        currentWorkplace: "Student"
      },
      {
        name: "Mahir Areek",
        nickname: "Mahir",
        email: "islam2431003@stud.kuet.ac.bd",
        hometown: "Dhaka",
        roll: "2431003",
        bloodGroup: "AB+",
        phone: "01994666202",
        linkedin: "N/A",
        bio: "N/A",
        currentWorkplace: "Student"
      }
    ];

    return specificStudents.map((specific) => ({
      id: `${session}-${specific.roll}`,
      session,
      ...specific,
      photoUrl: `/${specific.roll}.jpg`
    })) as Student[];
  }

  if (session === '2022-23') {
    const specificStudents: Partial<Student>[] = [
      {
        name: "Saiful Islam Shanto",
        nickname: "Shanto",
        email: "saifulshanto333@gmail.com",
        hometown: "Noakhali",
        roll: "2231006",
        bloodGroup: "AB+",
        phone: "01540119722",
        linkedin: "https://www.linkedin.com/in/shanto006/",
        bio: "N/A",
        currentWorkplace: "Student"
      }
    ];

    const generated = students.filter(s => !specificStudents.some(spec => spec.roll === s.roll));
    const mapped = specificStudents.map(spec => ({
      id: `${session}-${spec.roll}`,
      session,
      ...spec,
      photoUrl: `/${spec.roll}.jpg`
    })) as Student[];

    return [...mapped, ...generated].slice(0, count);
  }

  return students;
};

export const mockBatches: Batch[] = sessions.map(session => ({
  session,
  students: generateMockStudents(session, 30)
}));
