import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

  // general overview: Login -> User state -> Project state -> Project Phase state -> Msg.s and Files related current/active phase
  test(user) {
    // 1st step: assuming user has logged in: Login -> User state
    console.log(`engineers.${user}`);
    let i;
    this.afs.collection(
      'test', ref => ref.where(`engineers.${user}`, '==', true)) // <- 2nd step, get list of 'user' involved projects, then display them
    // user clicked on a project from the list of the projects
    // state changed: User state -> Project state
    // display info about this project
    // and
    // 3rd step: from clicked 'project' object extract the 'phases' field and display 'phases' objects keys (on separate component)
    // when user selects a phase, state changes: Project state -> Project Phase state
    // load all docs from selected 'phase'+number collection
      .snapshotChanges()
      .subscribe(d => {
        console.dir(d);
        i = d[0].payload.doc.id;
        this.afs.doc('test/' + i).collection('phase1').valueChanges().subscribe(d => console.dir(d));
      });
    // at this moment user should be able to msg.s and files related to selected phase
    // sort list of msg.s by 'createdAt' and display them
    // allow user to send msg or upload file
  }
  ngOnInit() {
  }

}
