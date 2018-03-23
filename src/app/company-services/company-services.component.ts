import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-services',
  templateUrl: './company-services.component.html',
  styleUrls: ['./company-services.component.css']
})
export class CompanyServicesComponent implements OnInit {

  services = [
    {
      name: 'Rope Access',
      img: 'Rope Access',
      info: `IRATA approved rope access services such as inspection, repair/maintenance, blasting and coating, along with many other rope access services. 
      Abfad Ltd supply rope access personnel with the ability to perform work to the required specification. 
      Abfad’s safety supervisors are trained to the highest standards and will ensure risk assessments and method statements are provided and implemented for all work tasks.`
    },
    {
      name: 'Storage Tank Lining',
      img: 'Storage Tank Lining',
      info: `Providing corrosion protection for storage tanks with solvent free single skin coatings which fully encapsulate the internal steel of the storage tank 
      to prevent corrosion, and Fuelvac® double skin lining system with class 1 vacuum leak detection monitoring for above and below ground storage tanks.`,
      info1: `Fuelvac® has been installed in an above ground tank used for the storage of over 2 million litres of Hydrochloric Acid. 
      This is a world first for double skin tank lining.`
    },
    {
      name: 'Emergency Rescue',
      img: 'Emergency Rescue',
      info: `Emergency rescue and safety cover services for people working at height or within confined spaces, including tanks, silos, vats, vessels, 
      power station boilers, turbines and stacks, etc. Abfad provide highly trained and equipped rescue teams, able to respond to any incident in a 
      professional and experienced manner. Ensuring workers safety should be at the forefront of every company’s ethos and operating practices.`
    },
    {
      name: 'Pipeline Protection',
      img: 'Pipeline Protection',
      info: `PIPEVAC® provides the answer to elimination and monitoring of corrosion by creating and holding a permanent vacuum around the pipe circumference. 
      PIPEVAC® aims to provide an inspection and maintenance free corrosion prevention system, protecting from atmospheric corrosion as well as corrosion under 
      insulation (CUI), with complete 24/7 vacuum monitoring of the pipeline.`,
      info1: `PIPEVAC® provides the opportunity for real cost savings on external inspection, removal and re-installation of insulation, coatings and pipeline repair.`
    },
    {
      name: 'Magnetic Positioning Aid',
      img: 'Magnetic Positioning Aid',
      info: `Abfad’s patented magnet system has been developed for rope access technicians by rope access technicians, other methods of positioning and 
      anchoring were found to be time consuming, lacking in efficiency and in some cases completely ineffective. The Magnet System has been tested 
      rigorously including by the TWI (The Welding Institute) who have also tested the pull off strengths of the magnets.`,
      info1: `Manufactured using 316L stainless steel the magnet system is constructed to the highest standards using the best quality materials to 
      ensure each unit has increased corrosion resistance for use in extreme environments.`
    },
    {
      name: 'Weld Seam Monitoring',
      img: 'Weld Seam Monitoring',
      info: `Abfad’s Weld Seam Monitoring System monitors a structures vital welds and acts as an early warning indicator, allowing operators to investigate before a 
      catastrophic failure of the structure occurs.`,
      info1: `Any structure which suffers the potential for stress and fatigue will benefit from Weld Seam Monitoring. This could be wind turbines, bridges, pressure 
      vessel external welds, and any structure that is subjected to cyclic loading.`
    },
    {
      name: 'Renewable and Marine',
      img: 'Renewable and Marine',
      info: `Turbine blade inspections and repairs, blasting and Protective Coating refurbishment on both onshore and offshore structures, and more.`,
      info1: `Abfad are responsible for refurbishing the first commercial offshore wind farm in the UK, Scroby Sands at Great Yarmouth.`
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
