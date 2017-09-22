import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { Subscription } from 'rxjs/subscription';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';


@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItemSubscription: Subscription;
  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>;
  shoppingItem = {} as ShoppingItem;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private database: AngularFireDatabase) {

                const shoppingItemId = this.navParams.get('shoppingItemId')

                //log out nav parameter
                console.log(shoppingItemId);

                //set scope of firebase object equal to our selected params
                this.shoppingItemRef$ = this.database.object(`shopping-list/${shoppingItemId}`);

                //subscribe to assign the result to this.shoppingItem
                this.shoppingItemSubscription = this.shoppingItemRef$.subscribe(
                  shoppingItem => this.shoppingItem = shoppingItem);
  }

  editShoppingItem(shoppingItem: ShoppingItem) {
    this.shoppingItemRef$.update(shoppingItem);
    this.navCtrl.pop();
  }

  ionViewWillLeave() {
  //frees up memory resources
    this.shoppingItemSubscription.unsubscribe();
  }

}
