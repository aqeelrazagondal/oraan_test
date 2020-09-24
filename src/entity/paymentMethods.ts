import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { Length } from "class-validator";

@Entity()
export class PaymentMethod {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 80,
        type: "varchar"
    })
    @Length(5, 80)
    title: string;

    // Generic Fields
    @Column({ nullable: true, type: "datetime" })
    createdAt: Date;
    
    @Column({ nullable: true, type: "datetime" })
    updatedAt: Date;

    @BeforeInsert()
    beforeinsert() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    beforeUpdate() {
        this.createdAt = new Date();
    }
}