import { Bicycle } from 'src/modules/bicycles/entities/bicycle.entity';
import { PickupLocation } from 'src/modules/pickup-location/entities/pickup-location.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { AfterInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Reservation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable:false, update:false})
    user_id:string;

    @ManyToOne(() => User, user => user.reservations)
    @JoinColumn({name:'user_id'})
    user: User;
    
    @Column({nullable:false})
    location_id:string;

    @ManyToOne(() => PickupLocation, location => location.reservations)
    @JoinColumn({name:'location_id'})
    location: PickupLocation;

    @Column({nullable:true})
    bicycle_id:string;

    @ManyToOne(() => Bicycle, bicycle => bicycle.reservations)
    @JoinColumn({name:'bicycle_id'})
    bicycle: Bicycle;

    @Column({type:'timestamptz'})
    reserve_for: Date;
 
    @CreateDateColumn({type:'timestamptz'})
    created_at: Date;

    @Column({ default: false })
    completed: boolean

    @AfterInsert()
    setNullAfterInsert(){
        if(!this.bicycle){
            this.bicycle = null;
        }
    }

    @AfterInsert()
    setNullAfterUpdate(){
        if(!this.bicycle){
            this.bicycle = null;
        }
    }
}