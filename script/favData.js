const favors = [
  {
    id: 1,
    title: "Moving Sofa",
    ImageURL:
      "https://cdn.distinctivechesterfields.com/wp-content/uploads/sites/4/2019/12/Wally_Sofa2-1024x556.png?w=600&ch=DPR&dpr=2",
    description:
      "I could use a hand this weekend moving my old couch to the curb.",
    //status should be a boolean on open, "OPEN" is open "CLOSED" closed
    status: "OPEN",
    favorDate: "2022-03-09",
    authorId: "1",
    lat: 51.615,
    lng: -0.09,
  },
  {
    id: 2,
    title: "New Printer Setup",
    ImageURL:
      "https://i.rtings.com/assets/products/yJMWE5vx/hp-envy-photo-7855/design-medium.jpg",
    description: "i cant seem to get my new printer to connect to my computer.",
    status: "CLOSED",
    favorDate: "2022-03-15",
    authorId: "2",
    lat: 51.605,
    lng: -0.09,
  },
  {
    id: 3,
    title: "Broken Mailbox",
    ImageURL:
      "https://www.brokemailboxdesigns.com/wp-content/uploads/2014/04/Broken-MailBox-11-5-14.png",
    description:
      "My mailbox was damage by the garbage truck this week, I would like a hand repairing it.",
    status: "OPEN",
    favorDate: "2022-03-06",
    authorId: "2",
    lat: 51.611,
    lng: -0.1,
  },
  {
    id: 4,
    title: "Tree blocking stop sign",
    ImageURL:
      "https://townsquare.media/site/106/files/2016/06/Stop-Sign-Visibility-Featured.jpg",
    description:
      "One of the trees on my property is obscuring the stop sign, i qam worried this poses a safety issue. I would like some assistance trimming the parts blocking the sign.",
    status: "OPEN",
    favorDate: "2022-03-12",
    authorId: "5",
    lat: 51.621,
    lng: -0.095,
  },
  {
    id: 5,
    title: "Need to borrow a toolset",
    ImageURL:
      "https://www.emilyreviews.com/wp-content/uploads/2019/04/IMG_0780.jpg",
    description:
      "Im building a crib for our new baby and I dont have the required tools, I just need to borrow them for an afternoon to complete the crib.",
    status: "OPEN",
    favorDate: "2022-03-16",
    authorId: "4",
    lat: 51.618,
    lng: -0.092,
  },
  {
    id: 6,
    title: "Help changing a tail light",
    ImageURL:
      "https://www.motorbiscuit.com/wp-content/uploads/2016/06/20160629_121032.jpg",
    description:
      "One of the tail lights on my car is out, the police stopped me last night.",
    status: "OPEN",
    favorDate: "2022-03-05",
    authorId: "2",
    lat: 51.615,
    lng: -0.11,
  },
  {
    id: 7,
    title: "Moving trailer in driveway",
    ImageURL:
      "https://i.pinimg.com/originals/c6/e1/b2/c6e1b27cc3799c6c0580e49ff23939bd.jpg",
    description:
      "My son left his camper trailer in my driveway when he moved away. I want to move it onto the street so it can be towed away. I am donating it to charity and they need it to be on the street for collection. Looking for someone who is experienced working with heavy equipment",
    status: "OPEN",
    favorDate: "2022-03-06",
    authorId: "6",
    lat: 51.611,
    lng: -0.09,
  },
  {
    id: 8,
    title: "Basketball hoop",
    ImageURL:
      "https://improvehoops.com/wp-content/uploads/2018/01/Spalding-Beast-e1520773330907.jpg?ezimgfmt=rs:330x170/rscb1/ng:webp/ngcb1",
    description:
      "I have a basketball hoop that has a loose arm on the backboard so it creaks terribly when its hit with the ball. I would like a hand in tightening the arm.",
    status: "CLOSED",
    favorDate: "2022-03-09",
    authorId: "7",
    lat: 51.615,
    lng: -0.12,
  },
  {
    id: 9,
    title: "Porch light bulb blown",
    ImageURL:
      "https://www.bordeaubuilders.com/wp-content/uploads/2016/11/bordeau-porchlight-1100x480.jpg",
    description:
      "The bulb in my porch light is blwon and i cannot reach it. I have the bulb so i just need to borrow a short ladder or tall neighbor to change the bulb.",
    status: "CLOSED",
    favorDate: "2022-03-09",
    authorId: "8",
    lat: 51.613,
    lng: -0.099,
  },
  {
    id: 10,
    title: "Broken fence",
    ImageURL:
      "https://thumbs.dreamstime.com/b/literal-mending-broken-fences-depiction-where-residential-wooden-fence-has-collapsed-violent-wind-storm-172230126.jpg",
    description:
      "A deer or group of deer damaged my fence. i have the tools and materials I just need an extra set of hands to do complete this task.",
    status: "OPEN",
    favorDate: "2022-03-08",
    authorId: "7",
    lat: 51.601,
    lng: -0.112,
  },
];

const bids = [
  {
    description: "I can do it today!",
    volunteerId: 2,
    status: "PENDING",
    favorId: 1,
  },
  {
    description: "Name a time and a place",
    volunteerId: 6,
    status: "PENDING",
    favorId: 1,
  },
  {
    description: "If you need an extra hand, I move couches all the time",
    volunteerId: 5,
    status: "PENDING",
    favorId: 1,
  },
  {
    description: "I may be able to help, but not until tomorrow",
    volunteerId: 1,
    status: "PENDING",
    favorId: 2,
  },
  {
    description: "I want to help!",
    volunteerId: 3,
    status: "PENDING",
    favorId: 2,
  },
  {
    description: "If you can't find anyone else, call me",
    volunteerId: 4,
    status: "PENDING",
    favorId: 2,
  },
  {
    description: "I'm great with computers!",
    volunteerId: 6,
    status: "FULFILLED",
    favorId: 2,
  },
  {
    description: "here's my number 555-5555 call me",
    volunteerId: 5,
    status: "PENDING",
    favorId: 2,
  },

  {
    description: "Available any morning next week",
    volunteerId: 7,
    status: "PENDING",
    favorId: 3,
  },
  {
    description: "Available any morning next week",
    volunteerId: 7,
    status: "PENDING",
    favorId: 4,
  },
  {
    description: "I've got 2 of every tool under the sun. What do you need?",
    volunteerId: 12,
    status: "PENDING",
    favorId: 5,
  },
  {
    description: "No problem! We'll fix it up",
    volunteerId: 12,
    status: "PENDING",
    favorId: 6,
  },

  {
    description: "Available any morning next week",
    volunteerId: 7,
    status: "PENDING",
    favorId: 7,
  },
  {
    description:
      "Depending on the size of the trailer, my husband's truck may be able to move it",
    volunteerId: 8,
    status: "PENDING",
    favorId: 7,
  },
  {
    description: "I have experience fixing bball hoops",
    volunteerId: 8,
    status: "FULFILLED",
    favorId: 8,
  },

  {
    description: "If its wooden I can fix that easily",
    volunteerId: 8,
    status: "FULFILLED",
    favorId: 8,
  },
  {
    description: "Think I've got some extra bulbs laying around",
    volunteerId: 7,
    status: "FULFILLED",
    favorId: 9,
  },
  {
    description: "I have more extra light bulbs than I can handle",
    volunteerId: 9,
    status: "PENDING",
    favorId: 9,
  },
  {
    description: "Available any morning next week",
    volunteerId: 7,
    status: "PENDING",
    favorId: 9,
  },

  {
    description: "Is it chain link or picket? Let's chat",
    volunteerId: 9,
    status: "PENDING",
    favorId: 10,
  },
];

module.exports = { favors, bids };
