/*
  FOLLOW THE PATTY — research data
  ------------------------------------------------------------------
  Everything the site shows lives in this file. To add research,
  add an entry to the right list and reload the page. No build step.

  Evidence classes (what kind of claim it is):
    "verified"        directly supported by a primary or highly authoritative source
    "interpretation"  an argument made by a named researcher
    "inference"       a reasonable conclusion drawn from several pieces of evidence
    "unresolved"      the available evidence cannot settle it

  Evidence strength (how directly it supports the specific claim):
    "strong" | "moderate" | "limited" | "uncertain"

  Anything not yet checked against its source carries  verify: true
  and is shown on the page as NEEDS SOURCE VERIFICATION.
*/

window.FTP = {};

/* ------------------------------------------------------------------
   SOURCES  (MLA 9). Only URLs that were actually checked are listed.
------------------------------------------------------------------ */
FTP.sources = [
  {
    id: "mmwr-prelim",
    group: "primary",
    author: "Centers for Disease Control and Prevention",
    short: "CDC, MMWR, 5 Feb. 1993",
    title: "Preliminary Report: Foodborne Outbreak of Escherichia coli O157:H7 Infections from Hamburgers — Western United States, 1993",
    date: "5 Feb. 1993",
    type: "Government source",
    mla: "Centers for Disease Control and Prevention. “Preliminary Report: Foodborne Outbreak of Escherichia coli O157:H7 Infections from Hamburgers — Western United States, 1993.” <i>Morbidity and Mortality Weekly Report</i>, vol. 42, no. 4, 5 Feb. 1993, pp. 85–86.",
    url: "https://pubmed.ncbi.nlm.nih.gov/8429811/",
    why: "The first federal report on the outbreak, written while it was still under way.",
    supports: "That a multistate outbreak linked to one restaurant chain's hamburgers was recognized by early February 1993."
  },
  {
    id: "mmwr-update",
    group: "primary",
    author: "Centers for Disease Control and Prevention",
    short: "CDC, MMWR, 16 Apr. 1993",
    title: "Update: Multistate Outbreak of Escherichia coli O157:H7 Infections from Hamburgers — Western United States, 1992–1993",
    date: "16 Apr. 1993",
    type: "Government source",
    mla: "Centers for Disease Control and Prevention. “Update: Multistate Outbreak of Escherichia coli O157:H7 Infections from Hamburgers — Western United States, 1992–1993.” <i>Morbidity and Mortality Weekly Report</i>, vol. 42, no. 14, 16 Apr. 1993, pp. 258–63.",
    url: "https://www.cdc.gov/mmwr/preview/mmwrhtml/00020219.htm",
    why: "The official investigation record: dates, case counts by state, the case-control study, the recall and the traceback.",
    supports: "Almost every date and number in The Outbreak and the Washington map."
  },
  {
    id: "bell-1994",
    group: "primary",
    author: "Bell, Beth P., et al.",
    short: "Bell et al., JAMA, 1994",
    title: "A Multistate Outbreak of Escherichia coli O157:H7–Associated Bloody Diarrhea and Hemolytic Uremic Syndrome from Hamburgers: The Washington Experience",
    date: "2 Nov. 1994",
    type: "Academic research",
    mla: "Bell, Beth P., et al. “A Multistate Outbreak of Escherichia coli O157:H7–Associated Bloody Diarrhea and Hemolytic Uremic Syndrome from Hamburgers: The Washington Experience.” <i>JAMA</i>, vol. 272, no. 17, 1994, pp. 1349–53.",
    url: "https://jamanetwork.com/journals/jama/article-abstract/381755",
    why: "The investigators' own peer-reviewed account of the Washington State investigation (case-control study, environmental investigation, surveillance).",
    supports: "How Washington investigators traced the source. Its detailed findings still need to be read and added.",
    verify: true
  },
  {
    id: "riley-1983",
    group: "academic",
    author: "Riley, Lee W., et al.",
    short: "Riley et al., NEJM, 1983",
    title: "Hemorrhagic Colitis Associated with a Rare Escherichia coli Serotype",
    date: "24 Mar. 1983",
    type: "Academic research",
    mla: "Riley, Lee W., et al. “Hemorrhagic Colitis Associated with a Rare Escherichia coli Serotype.” <i>New England Journal of Medicine</i>, vol. 308, no. 12, 24 Mar. 1983, pp. 681–85.",
    url: "https://www.nejm.org/doi/abs/10.1056/NEJM198303243081203",
    why: "The study that first tied E. coli O157:H7 to illness, after two 1982 outbreaks linked to one fast-food chain in Oregon and Michigan.",
    supports: "That O157:H7 was known as a hamburger-associated danger about ten years before 1993."
  },
  {
    id: "fsis-labels-1994",
    group: "primary",
    author: "U.S. Department of Agriculture, Food Safety and Inspection Service",
    short: "FSIS, Federal Register, 28 Mar. 1994",
    title: "Mandatory Safe Handling Statements on Labeling of Raw Meat and Poultry Products",
    date: "28 Mar. 1994",
    type: "Government source",
    mla: "United States, Department of Agriculture, Food Safety and Inspection Service. “Mandatory Safe Handling Statements on Labeling of Raw Meat and Poultry Products.” <i>Federal Register</i>, vol. 59, no. 59, 28 Mar. 1994, p. 14528.",
    url: "https://www.govinfo.gov/content/pkg/FR-1994-03-28/html/94-7217.htm",
    why: "A federal rule that made safe-handling and cooking instructions mandatory on raw meat and poultry labels.",
    supports: "A concrete government change in the outbreak's aftermath (effective 27 May 1994 for ground products)."
  },
  {
    id: "espy-1994",
    group: "primary",
    author: "U.S. District Court, Western District of Texas",
    short: "Texas Food Industry Ass'n v. Espy, 1994",
    title: "Texas Food Industry Association v. Espy, 870 F. Supp. 143",
    date: "13 Dec. 1994",
    type: "Primary source",
    mla: "<i>Texas Food Industry Association v. Espy</i>. 870 F. Supp. 143. United States District Court, Western District of Texas, 13 Dec. 1994.",
    url: "https://law.justia.com/cases/federal/district-courts/FSupp/870/143/1647668/",
    why: "Industry groups sued to stop USDA testing raw ground beef for E. coli O157:H7; the court refused to block the program.",
    supports: "That treating O157:H7 as an adulterant was a real legal change, and that industry contested it."
  },
  {
    id: "fsis-haccp-1996",
    group: "primary",
    author: "U.S. Department of Agriculture, Food Safety and Inspection Service",
    short: "FSIS, Federal Register, 25 July 1996",
    title: "Pathogen Reduction; Hazard Analysis and Critical Control Point (HACCP) Systems; Final Rule",
    date: "25 July 1996",
    type: "Government source",
    mla: "United States, Department of Agriculture, Food Safety and Inspection Service. “Pathogen Reduction; Hazard Analysis and Critical Control Point (HACCP) Systems; Final Rule.” <i>Federal Register</i>, vol. 61, 25 July 1996, p. 38806.",
    url: "https://www.federalregister.gov/documents/1996/07/25/96-17837/pathogen-reduction-hazard-analysis-and-critical-control-point-haccp-systems",
    why: "The 1996 rule itself. It is a USDA regulation, not an Act of Congress.",
    supports: "That federally inspected plants had to adopt preventive HACCP systems and pathogen-reduction measures."
  },
  {
    id: "rangel-2005",
    group: "primary",
    author: "Rangel, Josefa M., et al.",
    short: "Rangel et al., Emerging Infectious Diseases, 2005",
    title: "Epidemiology of Escherichia coli O157:H7 Outbreaks, United States, 1982–2002",
    date: "Apr. 2005",
    type: "Government source",
    mla: "Rangel, Josefa M., et al. “Epidemiology of Escherichia coli O157:H7 Outbreaks, United States, 1982–2002.” <i>Emerging Infectious Diseases</i>, vol. 11, no. 4, 2005, pp. 603–09.",
    url: "https://wwwnc.cdc.gov/eid/article/11/4/04-0739_article",
    why: "CDC scientists reviewed twenty years of O157:H7 outbreaks, before and after 1993.",
    supports: "Both change (fast-food hamburger outbreaks stopped being reported after 1995) and continuity (outbreaks from ground beef and other foods kept happening)."
  },
  {
    id: "juska-2000",
    group: "academic",
    author: "Juska, Arunas, et al.",
    short: "Juska et al., Sociologia Ruralis, 2000",
    title: "Negotiating Bacteriological Meat Contamination Standards in the US: The Case of E. coli O157:H7",
    date: "Apr. 2000",
    type: "Academic research",
    mla: "Juska, Arunas, et al. “Negotiating Bacteriological Meat Contamination Standards in the US: The Case of E. coli O157:H7.” <i>Sociologia Ruralis</i>, vol. 40, no. 2, Apr. 2000, pp. 249–71.",
    url: "https://onlinelibrary.wiley.com/doi/10.1111/1467-9523.00146",
    why: "Divides meat-safety standards into stages (before 1982, after 1982, after 1993, after 1996) and explains the money, politics and science behind each change.",
    supports: "Testing whether the outbreak was the main cause or one cause among several."
  },
  {
    id: "juska-2003",
    group: "academic",
    author: "Juska, Arunas, et al.",
    short: "Juska et al., Agriculture and Human Values, 2003",
    title: "Manufacturing Bacteriological Contamination Outbreaks in Industrialized Meat Production Systems: The Case of E. coli O157:H7",
    date: "Mar. 2003",
    type: "Academic research",
    mla: "Juska, Arunas, et al. “Manufacturing Bacteriological Contamination Outbreaks in Industrialized Meat Production Systems: The Case of E. coli O157:H7.” <i>Agriculture and Human Values</i>, vol. 20, no. 1, Mar. 2003, pp. 3–19.",
    url: "https://link.springer.com/article/10.1023/A:1022416727626",
    why: "Argues that industry concentration since the 1980s made beef more vulnerable to fast-spreading outbreaks, and asks how well HACCP works.",
    supports: "The view that an outbreak like 1993 was a product of the system, not a surprise."
  },
  {
    id: "dunn-2007",
    group: "academic",
    author: "Dunn, Elizabeth",
    short: "Dunn, Space and Polity, 2007",
    title: "Escherichia coli, Corporate Discipline and the Failure of the Sewer State",
    date: "Apr. 2007",
    type: "Academic research",
    mla: "Dunn, Elizabeth. “Escherichia coli, Corporate Discipline and the Failure of the Sewer State.” <i>Space and Polity</i>, vol. 11, no. 1, Apr. 2007, pp. 35–53.",
    url: "https://www.tandfonline.com/doi/abs/10.1080/13562570701406568",
    why: "Explains that under HACCP companies monitor their own production instead of federal inspectors checking every carcass, and connects that system to the Jack in the Box outbreak.",
    supports: "What changed in how meat is inspected, and a critical view of whether it worked."
  },
  {
    id: "murano-2018",
    group: "secondary",
    author: "Murano, Elsa A., H. Russell Cross, and Penny K. Riggs",
    short: "Murano, Cross & Riggs, Animal Frontiers, 2018",
    title: "The Outbreak That Changed Meat and Poultry Inspection Systems Worldwide",
    date: "Oct. 2018",
    type: "Secondary historical analysis",
    mla: "Murano, Elsa A., et al. “The Outbreak That Changed Meat and Poultry Inspection Systems Worldwide.” <i>Animal Frontiers</i>, vol. 8, no. 4, 2018, pp. 4–8.",
    url: "https://academic.oup.com/af/article/8/4/4/5103483",
    why: "Written partly by insiders: H. Russell Cross was FSIS Administrator during the outbreak, and Elsa Murano later led food safety at USDA (2001–2004).",
    supports: "The officials' own account of how the government responded, including that preparatory work began in 1992."
  }
];

/* ------------------------------------------------------------------
   EVIDENCE  — the Evidence Board, the Chain and the Index all read this.
   topic tags feed the Evidence Index.
------------------------------------------------------------------ */
FTP.evidence = [
  {
    id: "E01", title: "A rare E. coli strain is linked to fast-food hamburgers", date: "1982–1983",
    category: "Science", topics: ["science", "timeline"],
    description: "Two 1982 outbreaks of bloody diarrhea in Oregon and Michigan, affecting at least 47 people, were tied to restaurants of one fast-food chain. Investigators isolated E. coli O157:H7 from patients and from a beef patty.",
    tells: "O157:H7 was identified as a cause of foodborne illness, connected to hamburger patties, more than ten years before 1993.",
    matters: "The danger was known before the outbreak, so 1993 was not a total surprise to scientists.",
    source: "riley-1983", sourceType: "Academic research", cls: "verified", strength: "strong",
    claim: "E. coli O157:H7 was recognized as a hamburger-associated threat by 1983.",
    limits: "A medical study. It does not discuss regulation or how industry responded."
  },
  {
    id: "E02", title: "A doctor reports sick children to the state", date: "13 Jan. 1993",
    category: "Outbreak", topics: ["outbreak", "map"],
    description: "A physician reported a cluster of children with hemolytic uremic syndrome (HUS), a kidney complication, to the Washington State Department of Health.",
    tells: "The investigation began with a doctor noticing a pattern in sick children, not with meat inspection.",
    matters: "It shows how the outbreak was detected: through medicine and public health.",
    source: "mmwr-update", sourceType: "Government source", cls: "verified", strength: "strong",
    claim: "The outbreak investigation started with a physician's report of children with HUS in Washington State.",
    limits: "The CDC report does not name the physician, the hospital, or the counties involved."
  },
  {
    id: "E03", title: "Sick people had eaten at the same chain", date: "16–17 Jan. 1993",
    category: "Outbreak", topics: ["outbreak", "restaurants"],
    description: "A case-control study implicated eating at “chain A” restaurants in the week before illness. 372 of 425 patients (88%) had eaten at chain A within 9 days of getting sick; 312 of 338 who remembered what they ate (92%) had a regular-sized hamburger patty.",
    tells: "Investigators connected the cases to one restaurant chain and one product within days.",
    matters: "This statistical link is what turned scattered illnesses into a single outbreak with a single source.",
    source: "mmwr-update", sourceType: "Government source", cls: "verified", strength: "strong",
    claim: "Cases were linked to hamburgers from one restaurant chain.",
    limits: "The CDC report calls the chain “chain A.” Naming it Jack in the Box relies on other sources, such as Bell et al. (1994) and Murano et al. (2018)."
  },
  {
    id: "E04", title: "The recall recovers about one in five patties", date: "18 Jan. 1993",
    category: "Outbreak", topics: ["outbreak", "government"],
    description: "A multistate recall began on 18 January. About 272,672 of the implicated patties, roughly 20%, were recovered.",
    tells: "Most of the contaminated meat had already been served or could not be found when the recall began.",
    matters: "It shows the limits of reacting after the fact, an argument later used for prevention-based rules.",
    source: "mmwr-update", sourceType: "Government source", cls: "verified", strength: "strong",
    claim: "A recall began on 18 January 1993 and recovered about 20% of implicated patties.",
    limits: "The report does not say who ordered the recall or how it was carried out."
  },
  {
    id: "E05", title: "The meat came from many plants and farms", date: "Jan.–Apr. 1993",
    category: "Meat industry", topics: ["industry", "outbreak"],
    description: "The outbreak strain was found in 11 lots of patties produced on 19 and 20 November 1992. Traceback pointed to five U.S. slaughter plants and one in Canada as likely sources, with animals from farms and auctions in six western states. No single plant or farm was identified.",
    tells: "One patty could contain meat from many animals and places, so a source was nearly impossible to pin down.",
    matters: "This is the industrial system that Juska et al. argue made outbreaks like this likely.",
    source: "mmwr-update", sourceType: "Government source", cls: "verified", strength: "strong",
    claim: "Ground beef in the outbreak was traced to multiple slaughter plants and farms, not one source.",
    limits: "It describes one product chain. It does not by itself prove the whole industry was riskier than before."
  },
  {
    id: "E06", title: "Four states, four deaths", date: "15 Nov. 1992 – 28 Feb. 1993",
    category: "Outbreak", topics: ["outbreak", "map"],
    description: "Cases meeting the case definition: Washington 477, Nevada 58, California 34, and Idaho 14 culture-confirmed. Four people died: three in Washington and one in California.",
    tells: "The outbreak was centered on Washington but crossed into three more western states.",
    matters: "The scale and the deaths of children are why the outbreak drew national attention.",
    source: "mmwr-update", sourceType: "Government source", cls: "verified", strength: "strong",
    claim: "The outbreak affected four western states and caused four deaths.",
    limits: "Counts depend on the case definition. Other sources give different totals (see Sources Disagree)."
  },
  {
    id: "E07", title: "Undercooking “likely played an important role”", date: "Apr. 1993",
    category: "Restaurants", topics: ["restaurants", "regulation"],
    description: "The CDC wrote that undercooking of hamburger patties likely played an important role, and noted that the FDA had issued interim recommendations to raise the internal temperature of cooked hamburgers to 155°F.",
    tells: "Cooking temperature was identified as a key factor, and federal cooking guidance changed in 1993.",
    matters: "This is the direct answer to the hook: part of why your burger is cooked the way it is.",
    source: "mmwr-update", sourceType: "Government source", cls: "verified", strength: "moderate",
    claim: "Federal guidance raised the recommended cooking temperature for hamburgers to 155°F after the outbreak.",
    limits: "“Likely” is the CDC's own hedge. The report does not give the chain's actual cooking temperatures."
  },
  {
    id: "E08", title: "Officials were already working on “critical control points”", date: "Apr. 1993",
    category: "Government", topics: ["government", "haccp"],
    description: "The CDC's editorial note stated that CDC was collaborating with USDA's Food Safety and Inspection Service to identify critical control points in processing, as part of a program to reduce pathogens such as O157:H7 entering the meat supply.",
    tells: "The prevention approach that became HACCP was already being discussed by federal agencies in 1993.",
    matters: "It complicates a simple story: the government was not starting from zero after the outbreak.",
    source: "mmwr-update", sourceType: "Government source", cls: "verified", strength: "moderate",
    claim: "Federal agencies were working on a critical-control-point approach in 1993.",
    limits: "It does not say when this work began, or whether it started because of the outbreak."
  },
  {
    id: "E09", title: "The FDA revises the Food Code for restaurants", date: "1993",
    category: "Restaurants", topics: ["restaurants", "regulation"],
    description: "In 1993 the FDA revised its Model Food Code for restaurants with new temperature guidelines for ground beef.",
    tells: "Restaurant cooking rules changed in the same year as the outbreak.",
    matters: "The Food Code is a model that states adopt, which is one way restaurant practice changes.",
    source: "rangel-2005", sourceType: "Government source", cls: "verified", strength: "moderate",
    claim: "Restaurant temperature guidance for ground beef changed in 1993.",
    limits: "A later summary, not the Food Code itself. States adopt the code on their own schedules."
  },
  {
    id: "E10", title: "Safe-handling labels become mandatory", date: "28 Mar. 1994",
    category: "Regulation", topics: ["regulation", "government"],
    description: "FSIS made safe-handling instructions mandatory on all raw meat and poultry labels, covering storage, cross-contamination, cooking, and leftovers. Ground products had to comply by 27 May 1994.",
    tells: "Within about 14 months of the outbreak, a federal rule put cooking and handling warnings on raw meat packages.",
    matters: "It is a change ordinary shoppers could see. The timing is consistent with the outbreak as a trigger.",
    source: "fsis-labels-1994", sourceType: "Government source", cls: "verified", strength: "moderate",
    claim: "A federal labeling rule followed the outbreak by about 14 months.",
    limits: "That the outbreak caused this rule is inference. The rule's own stated reasons have not been read yet.",
    verify: true
  },
  {
    id: "E11", title: "E. coli O157:H7 in ground beef becomes an “adulterant”", date: "1994",
    category: "Regulation", topics: ["regulation", "government", "industry"],
    description: "In 1994 FSIS began a sampling program that treated raw ground beef containing E. coli O157:H7 as adulterated, meaning illegal to sell. Supermarket and meat-industry groups sued, and on 13 December 1994 a federal court refused to block the program.",
    tells: "Before 1994, USDA had treated raw meat carrying pathogens as not adulterated. That changed for O157:H7.",
    matters: "A major legal shift, and the lawsuit shows that industry pushed back.",
    source: "espy-1994", sourceType: "Primary source", cls: "verified", strength: "strong",
    claim: "In 1994 USDA began treating O157:H7 in raw ground beef as an adulterant, and a federal district court refused to block the program.",
    limits: "The exact date of the announcement (reported as 28 Sept. 1994, by FSIS Administrator Michael Taylor) comes from secondary sources.",
    verify: true
  },
  {
    id: "E12", title: "The 1996 Pathogen Reduction / HACCP rule", date: "25 July 1996",
    category: "Regulation", topics: ["regulation", "haccp", "industry"],
    description: "USDA's final rule required federally inspected meat and poultry plants to take preventive and corrective measures at each stage of production where food-safety hazards occur (HACCP), plus pathogen-reduction measures.",
    tells: "Responsibility for preventing contamination moved toward the companies, with USDA checking their systems.",
    matters: "This is the “1996 rules” at the end of the chain. It is a USDA regulation, not the “Pathogen Reduction Act.”",
    source: "fsis-haccp-1996", sourceType: "Government source", cls: "verified", strength: "strong",
    claim: "In 1996 USDA required HACCP systems in federally inspected meat and poultry plants.",
    limits: "Whether and how the rule's preamble cites the 1993 outbreak still needs to be read in the original."
  },
  {
    id: "E13", title: "Insiders: the outbreak accelerated work begun in 1992", date: "2018",
    category: "Government", topics: ["government", "haccp", "historians"],
    description: "Murano, Cross and Riggs write that preparatory work on HACCP and risk-based inspection began in 1992, and that the outbreak accelerated mandatory HACCP. They also report that the outbreak was discussed at President Clinton's first cabinet meeting.",
    tells: "Officials who were there describe the outbreak as an accelerator, not the starting point.",
    matters: "This is the strongest single piece of evidence for “trigger, not sole cause.”",
    source: "murano-2018", sourceType: "Secondary historical analysis", cls: "interpretation", strength: "moderate",
    claim: "The outbreak sped up a change that was already being prepared.",
    limits: "Written 25 years later by people with a stake in how the reforms are remembered. The cabinet-meeting detail needs a primary source.",
    verify: true
  },
  {
    id: "E14", title: "Four stages of meat-safety standards", date: "2000",
    category: "Historians", topics: ["historians", "science", "government"],
    description: "Juska et al. divide U.S. standards into stages: before 1982, after O157:H7 was identified in 1982, after the 1993 outbreak, and after the 1996 rules. They explain the money, politics and science behind each change.",
    tells: "Researchers treat 1993 as one turning point inside a longer process.",
    matters: "It gives the investigation its structure, and a way to test how much 1993 itself explains.",
    source: "juska-2000", sourceType: "Academic research", cls: "interpretation", strength: "moderate",
    claim: "Meat-safety standards changed in several stages driven by science, politics and economics.",
    limits: "Sociologists writing for academics. Their framework is an argument, not a neutral timeline."
  },
  {
    id: "E15", title: "Concentration made the system vulnerable", date: "2003",
    category: "Meat industry", topics: ["industry", "historians", "continuity"],
    description: "Juska et al. argue that although beef is in some ways safer than in the past, the concentration of the meat industry since the 1980s made it more exposed to fast-spreading outbreaks. They question how well HACCP works.",
    tells: "Some researchers see the outbreak as a product of the system, not an accident.",
    matters: "If true, the outbreak was a symptom, and the deeper cause continued after 1996.",
    source: "juska-2003", sourceType: "Academic research", cls: "interpretation", strength: "moderate",
    claim: "Industrial concentration made outbreaks like 1993 more likely.",
    limits: "Strongly critical of industry, national in scope, and ends in 2003."
  },
  {
    id: "E16", title: "HACCP moved inspection onto the companies", date: "2007",
    category: "Historians", topics: ["haccp", "historians", "continuity"],
    description: "Dunn argues that under HACCP companies watch their own production instead of federal inspectors checking every carcass, and connects the start of this system to the Jack in the Box outbreak.",
    tells: "The change was not simply “more inspection.” It was a different kind of inspection.",
    matters: "It shows how a regulatory change can carry new risks of its own.",
    source: "dunn-2007", sourceType: "Academic research", cls: "interpretation", strength: "moderate",
    claim: "HACCP shifted monitoring responsibility from federal inspectors to companies.",
    limits: "A geographer's argument for academics, focused on USDA in the 2000s, not a plain timeline."
  },
  {
    id: "E17", title: "Outbreaks continued, but not from fast-food burgers", date: "1982–2002",
    category: "Continuity", topics: ["continuity", "restaurants", "industry"],
    description: "CDC researchers counted 350 O157:H7 outbreaks in the U.S. from 1982 to 2002: 8,598 cases and 40 deaths. 183 outbreaks were foodborne, and 75 of those (41%) were linked to ground beef. They report no fast-food hamburger outbreaks since 1995.",
    tells: "One kind of outbreak became rare after the reforms, while O157:H7 outbreaks overall did not disappear.",
    matters: "This is the core evidence for both change and continuity.",
    source: "rangel-2005", sourceType: "Government source", cls: "verified", strength: "strong",
    claim: "After 1995, fast-food hamburger outbreaks stopped being reported, but O157:H7 outbreaks continued from other sources.",
    limits: "Outbreak reports depend on detection and reporting, which also improved. Fewer reports does not prove fewer illnesses on its own."
  },
  {
    id: "E18", title: "A reported 46% drop in infections by 2004", date: "2018",
    category: "Continuity", topics: ["continuity", "historians"],
    description: "Murano et al. report that rates of E. coli O157:H7 infection fell 46% by 2004.",
    tells: "Officials connected to the reforms point to a large decline in infections.",
    matters: "If the figure holds, it is strong evidence that the post-1993 changes reduced risk.",
    source: "murano-2018", sourceType: "Secondary historical analysis", cls: "interpretation", strength: "limited",
    claim: "Infection rates fell substantially after the reforms.",
    limits: "The original data (likely CDC surveillance) has not been checked. The baseline year and the cause of the drop are not established here.",
    verify: true
  },
  {
    id: "E19", title: "Washington's cooking rule and the chain's practice", date: "1993",
    category: "Restaurants", topics: ["restaurants", "regulation"],
    description: "What temperature did Washington State require for hamburgers before the outbreak, and did chain A meet it? The sources gathered so far do not say.",
    tells: "Nothing yet. This is a gap in the evidence.",
    matters: "It decides whether the outbreak was a failure to follow existing rules, or a failure of the rules themselves.",
    source: null, sourceType: "Government source", cls: "unresolved", strength: "uncertain",
    claim: "Unknown: whether the chain was meeting the state's cooking requirement.",
    limits: "Needs Washington State Department of Health records or Bell et al. (1994).",
    verify: true
  }
];

/* ------------------------------------------------------------------
   CASE FILES — The Outbreak line list
------------------------------------------------------------------ */
FTP.caseFiles = [
  { n: "01", date: "15 Nov. 1992 →", place: "Washington State", event: "People become sick", detail: "The outbreak period the CDC later defined begins 15 November 1992. Patties implicated in the Washington cases were produced on 19–20 November 1992.", evidence: ["E05", "E06"], source: "mmwr-update", strength: "strong" },
  { n: "02", date: "13 Jan. 1993", place: "Washington State", event: "Health officials notice a pattern", detail: "A physician reports a cluster of children with hemolytic uremic syndrome to the Washington State Department of Health.", evidence: ["E02"], source: "mmwr-update", strength: "strong" },
  { n: "03", date: "16–17 Jan. 1993", place: "Washington State", event: "The cases are connected to one chain", detail: "A case-control study implicates eating at chain A restaurants. 88% of patients had eaten there within 9 days of illness; most ate a regular-sized hamburger patty.", evidence: ["E03"], source: "mmwr-update", strength: "strong" },
  { n: "04", date: "Jan. 1993", place: "Laboratories", event: "Investigators identify E. coli O157:H7", detail: "The outbreak strain is isolated from patients and from 11 lots of patties produced on 19–20 November 1992.", evidence: ["E05", "E01"], source: "mmwr-update", strength: "strong" },
  { n: "05", date: "18 Jan. → Feb. 1993", place: "WA · ID · NV · CA", event: "The investigation expands beyond Washington", detail: "A multistate recall begins on 18 January. Cases are confirmed in Idaho, Nevada and California, and traceback reaches slaughter plants in the U.S. and Canada.", evidence: ["E04", "E06", "E05"], source: "mmwr-update", strength: "strong" },
  { n: "06", date: "5 Feb. 1993 →", place: "Washington, D.C.", event: "Federal attention increases", detail: "The CDC publishes its preliminary report nationally. FDA issues interim cooking recommendations, and CDC works with USDA on critical control points.", evidence: ["E07", "E08", "E13"], source: "mmwr-prelim", strength: "moderate" }
];

/* ------------------------------------------------------------------
   MAP — state-level only. The sources do not name restaurant
   locations, so none are plotted.
------------------------------------------------------------------ */
FTP.mapStates = {
  WA: { name: "Washington", cases: 477, hosp: 144, hus: 30, deaths: 3, basis: "met case definition" },
  ID: { name: "Idaho", cases: 14, hosp: 4, hus: 1, deaths: 0, basis: "culture-confirmed" },
  NV: { name: "Nevada", cases: 58, hosp: 9, hus: 3, deaths: 0, basis: "met case definition" },
  CA: { name: "California", cases: 34, hosp: 14, hus: 7, deaths: 1, basis: "met case definition" }
};
FTP.mapSteps = [
  { date: "13 Jan. 1993", title: "A report reaches the state", text: "A physician reports children with HUS to the Washington State Department of Health. The sources gathered do not name the city or hospital, so no point is plotted.", states: ["WA"], evidence: "E02" },
  { date: "16–17 Jan.", title: "One chain, one product", text: "A case-control study in Washington links the illnesses to chain A's regular hamburger patties.", states: ["WA"], evidence: "E03" },
  { date: "18 Jan.", title: "Recall across states", text: "A multistate recall begins. About 20% of implicated patties are recovered.", states: ["WA", "ID", "NV", "CA"], evidence: "E04" },
  { date: "Through 28 Feb.", title: "Cases confirmed in four states", text: "Washington carries most cases. Idaho, Nevada and California report cases linked to the same chain.", states: ["WA", "ID", "NV", "CA"], evidence: "E06" },
  { date: "Traceback", title: "The meat came from everywhere", text: "Five U.S. slaughter plants and one in Canada; animals from farms and auctions in six western states. No single source is found, and the sources do not name the locations.", states: ["WA", "ID", "NV", "CA"], wide: true, evidence: "E05" }
];

/* ------------------------------------------------------------------
   FOLLOW THE CHAIN — nodes and the links between them
------------------------------------------------------------------ */
FTP.chain = {
  nodes: [
    { id: "n1", label: "E. coli O157:H7 recognized as a foodborne threat", date: "1982–83" },
    { id: "n2", label: "The Jack in the Box outbreak", date: "1992–93" },
    { id: "n3", label: "Public attention and political pressure", date: "1993" },
    { id: "n4", label: "Government response", date: "1993–94" },
    { id: "n5", label: "Changes in meat-safety regulation", date: "1996" },
    { id: "n6", label: "Changes in industry practices", date: "1996 →" },
    { id: "n7", label: "Long-term consequences", date: "1995 → today" }
  ],
  links: [
    {
      from: "n1", to: "n2", strength: "moderate",
      reading: "Recognition did not cause the outbreak. It made the outbreak detectable.",
      evidence: ["E01", "E02", "E03"],
      cannot: "Whether the outbreak would have been identified so fast without the 1982 discovery, or whether earlier action on that knowledge could have prevented it."
    },
    {
      from: "n2", to: "n3", strength: "moderate",
      reading: "Children's deaths and a multistate recall made the outbreak national news inside government.",
      evidence: ["E06", "E04", "E13"],
      cannot: "How strong public pressure really was. No newspaper coverage, polling, or advocacy-group records have been gathered yet."
    },
    {
      from: "n3", to: "n4", strength: "moderate",
      reading: "Federal actions followed quickly, but some were already in motion.",
      evidence: ["E07", "E08", "E09", "E10", "E13"],
      cannot: "Whether these actions would have happened anyway, only later. The critical-control-point work predates the outbreak."
    },
    {
      from: "n4", to: "n5", strength: "moderate",
      reading: "The 1994 adulterant policy and the 1996 HACCP rule are the clearest regulatory changes.",
      evidence: ["E11", "E12", "E13", "E16"],
      cannot: "What the 1996 rule's own preamble says about the outbreak. It has not been read yet."
    },
    {
      from: "n5", to: "n6", strength: "strong",
      reading: "Plants had a legal duty to adopt HACCP, so the regulation directly required new practice.",
      evidence: ["E12", "E16", "E09"],
      cannot: "How individual restaurant chains changed their kitchens. No company source has been gathered."
    },
    {
      from: "n6", to: "n7", strength: "limited",
      reading: "Fast-food burger outbreaks stopped being reported, but outbreaks from other sources continued.",
      evidence: ["E17", "E18", "E15"],
      cannot: "That the reforms, rather than better cooking, testing or reporting, caused the decline."
    }
  ]
};

/* ------------------------------------------------------------------
   FOUR-STAGE TIMELINE (five periods). Every period uses the same
   rows so they can be compared row by row.
------------------------------------------------------------------ */
FTP.timelineRows = ["Regulation", "Science", "Industry", "Public pressure", "Government action", "Outbreaks"];
FTP.periods = [
  {
    id: "p1", label: "Before 1982", sub: "Before the strain was known",
    cells: {
      "Regulation": { text: "USDA treated pathogen-contaminated raw meat as not adulterated.", src: "espy-1994", cls: "verified" },
      "Science": { text: "E. coli O157:H7 was not yet linked to foodborne illness.", src: "riley-1983", cls: "inference" },
    }
  },
  {
    id: "p2", label: "1982–1993", sub: "A known danger",
    cells: {
      "Science": { text: "1982 outbreaks in Oregon and Michigan tie O157:H7 to one fast-food chain's hamburgers (published 1983).", src: "riley-1983", cls: "verified" },
      "Outbreaks": { text: "O157:H7 outbreaks were reported in the U.S. from 1982 onward.", src: "rangel-2005", cls: "verified" },
      "Government action": { text: "Preparatory work on HACCP and risk-based inspection began in 1992, according to the officials involved.", src: "murano-2018", cls: "interpretation" }
    }
  },
  {
    id: "p3", label: "1993", sub: "The outbreak", focus: true,
    cells: {
      "Outbreaks": { text: "Cases in WA, ID, NV and CA; four deaths. Patties from chain A.", src: "mmwr-update", cls: "verified" },
      "Science": { text: "The outbreak strain is isolated from patients and from 11 lots of patties.", src: "mmwr-update", cls: "verified" },
      "Government action": { text: "Recall on 18 January; FDA interim recommendation to cook hamburgers to 155°F.", src: "mmwr-update", cls: "verified" },
      "Regulation": { text: "FDA revises the Model Food Code's ground-beef temperature guidelines.", src: "rangel-2005", cls: "verified" },
      "Public pressure": { text: "Discussed at President Clinton's first cabinet meeting, according to officials.", src: "murano-2018", cls: "interpretation", verify: true }
    }
  },
  {
    id: "p4", label: "1993–1996", sub: "The response",
    cells: {
      "Regulation": { text: "Safe-handling labels mandatory (1994). O157:H7 treated as an adulterant in raw ground beef (1994). PR/HACCP final rule (July 1996).", src: "fsis-haccp-1996", cls: "verified" },
      "Industry": { text: "Meat-industry and supermarket groups sue to stop E. coli testing, and lose a preliminary injunction (Dec. 1994).", src: "espy-1994", cls: "verified" },
      "Government action": { text: "FSIS begins sampling raw ground beef for O157:H7 (1994).", src: "espy-1994", cls: "verified" },
      "Outbreaks": { text: "No fast-food hamburger outbreaks reported after 1995.", src: "rangel-2005", cls: "verified" }
    }
  },
  {
    id: "p5", label: "After 1996", sub: "What changed, what continued",
    cells: {
      "Industry": { text: "Plants run HACCP systems and monitor their own production; FSIS verifies.", src: "dunn-2007", cls: "interpretation" },
      "Outbreaks": { text: "O157:H7 outbreaks continue from ground beef and other foods.", src: "rangel-2005", cls: "verified" },
      "Science": { text: "A reported 46% fall in O157:H7 infections by 2004.", src: "murano-2018", cls: "interpretation", verify: true },
      "Government action": { text: "Officials say other countries exporting to the U.S. had to adopt equivalent systems.", src: "murano-2018", cls: "interpretation" }
    }
  }
];

/* ------------------------------------------------------------------
   THEN / NOW
------------------------------------------------------------------ */
FTP.thenNow = [
  { id: "inspection", label: "Inspection", year: "1994",
    then: { text: "USDA did not treat raw meat carrying pathogens as adulterated.", src: "espy-1994", cls: "verified" },
    now: { text: "Under the 1994 policy, raw ground beef containing O157:H7 was treated as adulterated, meaning illegal to sell, and FSIS began sampling for it.", src: "espy-1994", cls: "verified" } },
  { id: "processing", label: "Meat processing", year: "1996",
    then: { text: "One batch of patties traced back to five U.S. plants, one Canadian plant, and farms in six states. No single source could be found.", src: "mmwr-update", cls: "verified" },
    now: { text: "Under the 1996 rule, every federally inspected plant had to run a HACCP plan controlling hazards at each critical point.", src: "fsis-haccp-1996", cls: "verified" } },
  { id: "cooking", label: "Fast-food cooking", year: "1993",
    then: { text: "The CDC judged that undercooking likely played an important role. The chain's actual temperatures are not yet sourced.", src: "mmwr-update", cls: "verified", verify: true },
    now: { text: "In 1993 the FDA issued an interim recommendation to cook hamburgers to an internal temperature of 155°F. The Model Food Code was revised the same year (Exhibit E09).", src: "mmwr-update", cls: "verified" } },
  { id: "oversight", label: "Federal oversight", year: "1996",
    then: { text: "Inspectors examined carcasses on the line, an approach Dunn calls the old “sewer state” model.", src: "dunn-2007", cls: "interpretation" },
    now: { text: "Under the 1996 rule, FSIS verifies company-run HACCP systems and pathogen-reduction measures.", src: "fsis-haccp-1996", cls: "verified" } },
  { id: "responsibility", label: "Company responsibility", year: "1996",
    then: { text: "Detection depended largely on government inspectors and, in 1993, on doctors noticing sick patients.", src: "dunn-2007", cls: "interpretation" },
    now: { text: "Under the 1996 rule, companies had to identify their own hazards, monitor them, and correct failures.", src: "fsis-haccp-1996", cls: "verified" } },
  { id: "publichealth", label: "Public health", year: "Today",
    then: { text: "The outbreak was detected when a physician reported a cluster of children with HUS.", src: "mmwr-update", cls: "verified" },
    now: { text: "How outbreaks are detected today (for example, national DNA-fingerprinting networks) still needs a verified source.", src: null, cls: "unresolved", verify: true } }
];

/* ------------------------------------------------------------------
   WHAT DIDN'T CHANGE?
------------------------------------------------------------------ */
FTP.continuity = [
  { q: "Did E. coli outbreaks continue?", answer: "Yes. CDC researchers counted O157:H7 outbreaks through 2002, including from ground beef, even though fast-food hamburger outbreaks stopped being reported after 1995.", evidence: ["E17"], cls: "verified" },
  { q: "Did industrial meat production continue to create vulnerabilities?", answer: "Juska et al. argue it did: concentration made outbreaks spread faster, and HACCP did not remove that risk.", evidence: ["E15", "E05"], cls: "interpretation" },
  { q: "Did companies still have incentives to reduce costs?", answer: "No source gathered addresses this directly. It needs industry or economic evidence.", evidence: [], cls: "unresolved" },
  { q: "Did government oversight remain contested?", answer: "Yes, at least at first. Industry groups sued over E. coli testing in 1994. Dunn argues the HACCP model itself remained a weakness.", evidence: ["E11", "E16"], cls: "verified" },
  { q: "Did the new systems eliminate contamination or only reduce risk?", answer: "The evidence points to reduced risk, not elimination. A reported fall in infections sits alongside continuing outbreaks.", evidence: ["E17", "E18"], cls: "inference" }
];

/* ------------------------------------------------------------------
   WHO REALLY CAUSED THE CHANGE?
------------------------------------------------------------------ */
FTP.forces = [
  { id: "outbreak", label: "The outbreak", q: "How much did the 1993 outbreak matter?", for: "Rules followed quickly: Food Code (1993), labels (1994), adulterant policy (1994), HACCP rule (1996). Officials describe it as an accelerator.", against: "Some of this work was already under way in 1992–93.", evidence: ["E06", "E10", "E11", "E13"] },
  { id: "science", label: "Science", q: "How did knowledge about E. coli shape policy?", for: "O157:H7 had been known as a hamburger risk since 1982. The cooking-temperature answer came straight from that science.", against: "Ten years of knowledge did not produce these rules before 1993.", evidence: ["E01", "E07", "E14"] },
  { id: "consumers", label: "Consumers", q: "How much did public and consumer pressure matter?", for: "The outbreak reached a presidential cabinet meeting, according to officials.", against: "No evidence of consumer campaigns, media or polling has been gathered yet. This thread is the weakest.", evidence: ["E13"] },
  { id: "government", label: "Government", q: "What were regulators already considering?", for: "CDC and FSIS were working on critical control points in 1993; officials date preparation to 1992.", against: "Preparation is not the same as a rule. Mandatory HACCP came after the outbreak.", evidence: ["E08", "E13", "E12"] },
  { id: "industry", label: "Meat industry", q: "How did industrialization and concentration affect the situation?", for: "The outbreak traced to many plants and farms. Juska et al. argue the system made such outbreaks likely.", against: "Industry also resisted the new testing in court.", evidence: ["E05", "E15", "E11"] },
  { id: "restaurants", label: "Restaurants", q: "How did fast-food companies respond?", for: "Cooking guidance changed in 1993, and no fast-food hamburger outbreaks were reported after 1995.", against: "No company records have been gathered. What chains actually changed is still unsourced.", evidence: ["E07", "E09", "E17", "E19"] }
];

/* ------------------------------------------------------------------
   WHAT HISTORIANS ARGUE
------------------------------------------------------------------ */
FTP.historians = [
  { source: "juska-2003", argument: "Industry concentration since the 1980s made meat production vulnerable to fast-spreading outbreaks, so 1993 was a product of the system. They also ask whether HACCP really works.", helps: "Tests whether 1993 was a surprise or was bound to happen.", perspective: "Sociologists writing for food and farming scholars, and openly critical of the meat industry.", cannot: "It cannot establish what happened in Washington specifically, or anything after 2003." },
  { source: "dunn-2007", argument: "HACCP replaced inspectors checking every carcass with companies policing themselves, a shift she ties to the Jack in the Box outbreak and judges a failure.", helps: "Explains what changed in how meat is inspected.", perspective: "A geographer making a theoretical argument to other academics.", cannot: "It says little about 1993 itself, and is an argument rather than a timeline." },
  { source: "juska-2000", argument: "Meat-safety standards were negotiated in stages: before 1982, after 1982, after 1993, after 1996. Each was shaped by money, politics and science, not one event.", helps: "The best tool for testing whether the outbreak was the main cause or one cause.", perspective: "Sociologists focused on how standards are bargained over by interest groups.", cannot: "It cannot weigh how much each force mattered in exact terms." },
  { source: "murano-2018", argument: "The outbreak changed meat and poultry inspection worldwide by accelerating mandatory HACCP and risk-based inspection, work that had begun in 1992.", helps: "An inside view of how officials reacted.", perspective: "Written by former senior USDA food-safety officials, with an interest in presenting the reforms as a success.", cannot: "It cannot independently prove its own “worldwide” claim; that needs other countries' sources." }
];

/* Sources disagree — kept visible on purpose */
FTP.disagreements = [
  { topic: "How many people were sick?", positions: [
      { who: "mmwr-update", says: "583 cases meeting the case definitions across four states (477 + 14 + 34 + 58), and “more than 500” laboratory-confirmed." },
      { who: "rangel-2005", says: "More than 700 people ill (paraphrased)." },
      { who: "murano-2018", says: "600 or more illnesses." }
    ], note: "The totals differ because each source counts differently (case definitions, laboratory confirmation, later additions). None of them is simply wrong." },
  { topic: "Was the outbreak the cause or the accelerator?", positions: [
      { who: "dunn-2007", says: "Connects the start of the HACCP system to the outbreak." },
      { who: "murano-2018", says: "HACCP work began in 1992; the outbreak accelerated it." },
      { who: "juska-2000", says: "One stage among several, shaped by money, politics and science." }
    ], note: "This disagreement is the investigation." }
];

/* ------------------------------------------------------------------
   CONCLUSION — editable. These are the starting text; edits made
   on the page are saved in your browser. Paste final wording here.
------------------------------------------------------------------ */
FTP.conclusion = {
  headline: "The evidence suggests the 1993 outbreak was a catalyst for change, but it was not acting alone.",
  strong: "Federal food-safety rules changed quickly after the outbreak: Food Code temperatures (1993), mandatory safe-handling labels (1994), O157:H7 treated as an adulterant (1994), and the HACCP rule (1996). The outbreak itself is precisely documented by the CDC.",
  suggests: "The outbreak turned an existing plan into an urgent one. Officials say HACCP work began in 1992, and scientists had known about O157:H7 since 1982. The outbreak looks most like a trigger acting on pressures that already existed.",
  cannot: "Whether the 1996 rule would have come without the outbreak; how much public pressure there really was; how restaurant chains changed their kitchens; and whether the later fall in infections was caused by the rules."
};

FTP.lastQuestion = {
  q: "If the rules changed, why did E. coli outbreaks not simply disappear?",
  a: "Because historical change does not mean a problem disappears. The rules changed who was responsible for preventing contamination. After them, fast-food hamburger outbreaks stopped being reported (Rangel et al.), but whether the rules caused that is unproven. The conditions Juska et al. describe, large concentrated meat production, continued, and so did outbreaks from other foods. Change and continuity happened at the same time."
};

/* ------------------------------------------------------------------
   HOOK
------------------------------------------------------------------ */
FTP.hook = {
  choices: [
    { id: "policy", label: "Restaurant policy" },
    { id: "federal", label: "Federal regulation" },
    { id: "science", label: "Food science" },
    { id: "customer", label: "Customer preference" },
    { id: "all", label: "All of the above" }
  ]
};

/* ------------------------------------------------------------------
   EVIDENCE INDEX — Q&A jump list
------------------------------------------------------------------ */
FTP.index = [
  { label: "Outbreak timeline", target: "outbreak", topic: "outbreak" },
  { label: "Washington map", target: "map", topic: "map" },
  { label: "Government response", target: "chain", link: 2, topic: "government" },
  { label: "Regulation", target: "timeline", period: "p4", topic: "regulation" },
  { label: "HACCP", target: "evidence", open: "E12", topic: "haccp" },
  { label: "Meat industry", target: "evidence", open: "E05", topic: "industry" },
  { label: "Restaurant practices", target: "thennow", topic: "restaurants" },
  { label: "Academic arguments", target: "historians", topic: "historians" },
  { label: "Continuity", target: "continuity", topic: "continuity" },
  { label: "Conclusion", target: "conclusion", topic: "conclusion" }
];

/*
  PAGE COPY AND CAPTIONS — exact text supplied in the project brief.
  The research records above remain unchanged; this keeps the site copy data-driven.
*/
FTP.siteCopy = {
  "title": "FOLLOW THE PATTY",
  "subtitle": "How one E. coli outbreak changed American food safety",
  "openingLine": "January 1993. Washington State. A hamburger. And a chain of decisions that changed how America regulates ground beef.",
  "byline": "A Real History Project by Haresh Thiyagarajan, U.S. History, 4th period",
  "researchQuestion": "How did the 1993 Jack in the Box E. coli outbreak, which started with children who were sick in Washington state, cause the government to change how ground beef is regulated, and what changed in how fast food is made and inspected after this incident?",
  "deeperQuestion": "How much did the outbreak actually cause the changes that followed, what other forces contributed, and what changed or stayed the same afterward?",
  "introduction": [
    "The hamburger is one of the most consumed foods in America, and some argue it deserves the title of our national food. So it is hard to imagine one of them making hundreds of people sick, which is exactly what happened in January 1993. People who ate at Jack in the Box restaurants became extremely sick, and many of them were children. Health officials found that the cause was E. coli O157:H7, a bacterium that had been known as a food danger for only about ten years. In 1996 the U.S. Department of Agriculture issued the Pathogen Reduction / HACCP rule, which made meat companies more responsible for keeping their food safe.",
    "Some historians say the outbreak is the reason the rules changed in the first place. Other researchers say the meat industry had grown in a way that made an outbreak like this bound to happen, and that the new rules still have problems whose consequences we face today. I want to find out how much of the change the outbreak really explains, and what stayed the same after it. It also matters to me that this started in Washington, where all of us are from."
  ],
  "ruleFootnote": "The original proposal called the 1996 rule the “Pathogen Reduction Act”; it was actually a USDA regulation.",
  "aimsWhy": [
    "interest in medicine",
    "studied the outbreak in a summer health class",
    "a few sick people changed the rules for millions",
    "it started in Washington State"
  ],
  "aimsExpectation": "The outbreak was a big reason but not the only one. Scientists, consumer groups and the growth of the meat industry also pushed. Some things did not change, because outbreaks continued.",
  "aimsNeedToKnow": [
    {
      "question": "Outbreak timeline and how officials traced it.",
      "status": "Partly answered (CDC reports); WA Department of Health records not yet found."
    },
    {
      "question": "What the government changed 1993–1996 and who pushed for it.",
      "status": "Partly answered; public-pressure evidence is thin."
    },
    {
      "question": "How restaurants changed cooking and handling, and whether outbreaks fell.",
      "status": "Partly answered; no restaurant company records yet."
    },
    {
      "question": "Whether the outbreak caused the changes or only came before them.",
      "status": "Weighed, not settled."
    }
  ],
  "menuBoard": "ALL BURGERS COOKED TO ??? °F",
  "hookQuestion": "Why can't a fast-food restaurant simply cook a hamburger however it wants?",
  "afterVote": "To understand the answer, we have to go back to January 1993.",
  "imageCaptions": {
    "micrograph": "E. coli O157:H7, magnified 10,961 times. The strain behind the 1993 outbreak, photographed in 2006, not from the outbreak itself. Shown in grayscale. CDC Public Health Image Library #10071, Janice Haney Carr. Public domain.",
    "mmwr258": "The first page of the CDC's April 1993 update on the outbreak. It names the chain only as 'chain A.' Morbidity and Mortality Weekly Report, vol. 42, no. 14, p. 258. Public domain.",
    "epidemicCurve": "CDC Figure 1, Washington cases by week of onset. Public domain.",
    "mmwr260": "CDC MMWR, April 1993, p. 260: Idaho, California and Nevada case curves. Public domain.",
    "fsisBackgrounder": "FSIS Backgrounder, May 1994. A library catalogue label covers part of the masthead. Public domain.",
    "safeHandlingLabel": "Required on raw ground meat and poultry from 27 May 1994, and on all other raw meat and poultry by 6 July 1994. Source: FSIS Backgrounder, May 1994. Public domain.",
    "federalRegister": "The 1996 Pathogen Reduction; Hazard Analysis and Critical Control Point (HACCP) Systems final rule, Federal Register, vol. 61, no. 144, p. 38806. Public domain.",
    "usdaInspection": "Tagged beef carcasses in cold storage, photographed by USDA in 1999, three years after the HACCP rule. Public domain."
  },
  "curveText": "More cases began in the week of 17 January than in any other week. The CDC says “onsets of illness peaked from January 17 through January 20” (MMWR p. 259).",
  "mapSource": "CDC, MMWR, 16 Apr. 1993.",
  "footerDisclaimer": "A student research project, not affiliated with the CDC, USDA, FDA or any restaurant company. Historical documents and images are U.S. government works in the public domain."
};
FTP.siteCopy.evidenceClasses = {
  verified: "Supported by a primary or authoritative source.",
  interpretation: "An argument by a named researcher.",
  inference: "A reasonable conclusion drawn from several pieces of evidence.",
  unresolved: "The available evidence cannot settle it."
};
