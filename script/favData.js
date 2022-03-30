const favors = [
  {
    title: 'Moving Sofa',
    imageUrl:
      'https://firedawgsjunkremoval.com/wp-content/uploads/2015/02/old-sofa-removal-in-indianapolis.jpg',
    description:
      'I could use a hand this weekend moving my old couch to the curb.',
    //status should be a boolean on open, "OPEN" is open "CLOSED" closed
    status: 'OPEN',
    favorDate: '2022-03-09',
    authorId: '1',
    lat: 43.01114408227486,
    lng: -87.91168416348074
  },
  {
    title: 'New Printer Setup',
    imageUrl:
      'https://i.rtings.com/assets/products/yJMWE5vx/hp-envy-photo-7855/design-medium.jpg',
    description: 'i cant seem to get my new printer to connect to my computer.',
    status: 'CLOSED',
    favorDate: '2022-03-15',
    authorId: '3',
    lat: 43.012224,
    lng: -87.91289414285716
  },
  {
    title: 'Broken Mailbox',
    imageUrl:
      'https://www.brokemailboxdesigns.com/wp-content/uploads/2014/04/Broken-MailBox-11-5-14.png',
    description:
      'My mailbox was damage by the garbage truck this week, I would like a hand repairing it.',
    status: 'OPEN',
    favorDate: '2022-03-06',
    authorId: '2',
    lat: 43.00998114151013,
    lng: -87.94022537617863
  },
  {
    title: 'Tree blocking stop sign',
    imageUrl:
      'https://www.ci.apple-valley.mn.us/imageUrlRepository/Document?documentID=13540',
    description:
      'One of the trees on my property is obscuring the stop sign, i qam worried this poses a safety issue. I would like some assistance trimming the parts blocking the sign.',
    status: 'OPEN',
    favorDate: '2022-03-12',
    authorId: '5',
    lat: 42.996119740187375,
    lng: -87.92628676152603
  },
  {
    title: 'Need to borrow a toolset',
    imageUrl:
      'https://www.emilyreviews.com/wp-content/uploads/2019/04/IMG_0780.jpg',
    description:
      'Im building a crib for our new baby and I dont have the required tools, I just need to borrow them for an afternoon to complete the crib.',
    status: 'OPEN',
    favorDate: '2022-03-16',
    authorId: '4',
    lat: 43.015858019981046,
    lng: -87.91411147259828
  },
  {
    title: 'Help changing a tail light',
    imageUrl: '',
    description:
      'One of the tail lights on my car is out, the police stopped me last night.',
    status: 'OPEN',
    favorDate: '2022-03-05',
    authorId: '2',
    lat: 43.00998114151032,
    lng: -87.94022537617844
  },
  {
    title: 'Moving trailer in driveway',
    imageUrl:
      'https://i.pinimg.com/originals/c6/e1/b2/c6e1b27cc3799c6c0580e49ff23939bd.jpg',
    description:
      'My son left his camper trailer in my driveway when he moved away. I want to move it onto the street so it can be towed away. I am donating it to charity and they need it to be on the street for collection. Looking for someone who is experienced working with heavy equipment',
    status: 'OPEN',
    favorDate: '2022-03-06',
    authorId: '6',
    lat: 42.992022270568064,
    lng: -87.92914826052883
  },
  {
    title: 'Basketball hoop',
    imageUrl:
      'https://improvehoops.com/wp-content/uploads/2018/01/Spalding-Beast-e1520773330907.jpg?ezimgfmt=rs:330x170/rscb1/ng:webp/ngcb1',
    description:
      'I have a basketball hoop that has a loose arm on the backboard so it creaks terribly when its hit with the ball. I would like a hand in tightening the arm.',
    status: 'CLOSED',
    favorDate: '2022-03-09',
    authorId: '7',
    lat: 42.99151262921522,
    lng: -87.93019677942696
  },
  {
    title: 'Porch light bulb blown',
    imageUrl:
      'https://www.bordeaubuilders.com/wp-content/uploads/2016/11/bordeau-porchlight-1100x480.jpg',
    description:
      'The bulb in my porch light is blwon and i cannot reach it. I have the bulb so i just need to borrow a short ladder or tall neighbor to change the bulb.',
    status: 'CLOSED',
    favorDate: '2022-03-09',
    authorId: '8',
    lat: 42.99006241490951,
    lng: -87.92192638784873
  },
  {
    title: 'Broken fence',
    imageUrl:
      'https://thumbs.dreamstime.com/b/literal-mending-broken-fences-depiction-where-residential-wooden-fence-has-collapsed-violent-wind-storm-172230126.jpg',
    description:
      'A deer or group of deer damaged my fence. i have the tools and materials I just need an extra set of hands to do complete this task.',
    status: 'OPEN',
    favorDate: '2022-03-08',
    authorId: '7',
    lat: 42.99151262921522,
    lng: -87.93019677942642
  },
];

const bids = [
  {
    description: 'I can do it today!',
    volunteerId: 2,
    status: 'PENDING',
    favorId: 1,
  },
  {
    description: 'I may be able to help, but not until tomorrow',
    volunteerId: 1,
    status: 'PENDING',
    favorId: 2,
  },
  {
    description: 'I want to help!',
    volunteerId: 3,
    status: 'PENDING',
    favorId: 2,
  },
  {
    description: "If you can't find anyone else, call me",
    volunteerId: 4,
    status: 'PENDING',
    favorId: 2,
  },
  {
    description: "I'm free all weekend",
    volunteerId: 5,
    status: 'PENDING',
    favorId: 2,
  },
];

module.exports = { favors, bids };
