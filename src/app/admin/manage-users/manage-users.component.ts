import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import { AdminService } from '../admin.service';
import { Subject } from 'rxjs/Subject';
import { UserEditDialogComponent } from '../../helper/dialogs/user-edit-dialog/user-edit-dialog.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit, AfterViewInit, OnDestroy {

  admin = false;
  private ngUnsubscribe: Subject<any> = new Subject();

  displayedColumns = ['number', 'name', 'email', 'role', 'edit'];
  dataSource: MatTableDataSource<any>;

  // from original guide
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  // https://github.com/angular/material2/issues/10205
  private paginator: MatPaginator;
  private sort: MatSort;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.adminService.getAllUsers()
      .takeUntil(this.ngUnsubscribe)
      .subscribe( (users: any) => {
        users.map((user: any) => {
          user.modified = {...user.payload.doc.data(), uid: user.payload.doc.id};
        });
        const usersModified = Array.from(
          users, (user: any) => user = user.modified
        );
        this.dataSource = new MatTableDataSource(usersModified);
        this.admin = true;
      });
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    // from original guide
    // if (this.dataSource) {
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // }
  }

  // https://github.com/angular/material2/issues/10205
  setDataSourceAttributes() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  indexOf(user) {
    return this.dataSource.data.indexOf(user) + 1;
  }

  openDialog(user) {
    this.dialog.open( UserEditDialogComponent, {
      width: '350px',
      data: { ...user}
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
