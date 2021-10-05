import { BadRequestException, Injectable } from "@nestjs/common";
import { PickupLocationService } from "src/modules/pickup-location/services/pickup-location.service";
import { UsersService } from "src/modules/users/services/users.service";
import { CreateReservationDto } from "../dto/create-reservation.dto";
import { BicyclesService } from './../../bicycles/services/bicycles.service';
import { UpdateReservationDto } from './../dto/update-reservation.dto';

@Injectable()
export class ReservationValidator {
    constructor(
        private readonly userService: UsersService,
        private readonly pickupLocationService: PickupLocationService,
        private readonly bicycleService: BicyclesService,
    ) { }

    async validateCreateDTO(createReservationDto: CreateReservationDto) {
        const { id_user, id_location, id_bicycle, reserve_for } = createReservationDto;
        const resultObj = {}

        const _user = await this.userService.findOne(id_user);
        const _location = await this.pickupLocationService.findOne(id_location)

        if (!_user) {
            throw new BadRequestException(`user with id: ${id_user} doesn't exist`);
        }
        if (!_location) {
            throw new BadRequestException(`location with id: ${id_location} doesn't exist`);
        }

        resultObj['user'] = _user
        resultObj['location'] = _location

        // or both or none of the two
        if ((id_bicycle && !reserve_for)) {
            throw new BadRequestException('id_bicycle and reserve_for have to come together');
        }
        if (reserve_for) {
            resultObj['reserve_for'] = this._validateReservationDate(reserve_for)
        }

        if (id_bicycle) {
            resultObj['bicycle'] = await this._validateBicycle(id_bicycle);
        }

        return resultObj
    }

    async validateUpdateDTO(updateReservationDto: UpdateReservationDto) {
        if (Object.keys(updateReservationDto).length === 0) {
            throw new BadRequestException('Update values are not defined!')
        }
        const { id_location, id_bicycle, reserve_for } = updateReservationDto;
        const resultObj = {}

        // or both or none of the two
        if ((id_bicycle && !reserve_for)) {
            throw new BadRequestException("id_bicycle have to come ith reserve_for in order to complete the reservation");
        }
        if (reserve_for) {
            resultObj['reserve_for'] = this._validateReservationDate(reserve_for)
        }

        if (id_bicycle) {
            resultObj['bicycle'] = await this._validateBicycle(id_bicycle);
        }

        if (id_location) {
            resultObj['location'] = id_location
        }

        return resultObj
    }

    _validateReservationDate(reserve_for) {
        const _reserve_for = +new Date(reserve_for);
        const now = +new Date();

        //GET the time in hours
        let difference = Math.abs(now - _reserve_for) / 1000 / 60 / 60

        difference = new Date(difference).getHours();
        //compare if it's bigger than 24 h
        if (difference > +process.env.PRE_RESERVATION_TIME) {
            throw new BadRequestException(`reserve within 24 hour`);
        }

        return reserve_for
    }

    async _validateBicycle(id_bicycle) {
        const _bicycle = await this.bicycleService.findOne(id_bicycle);
        if (!_bicycle) {
            throw new BadRequestException(`bicycle with id: ${id_bicycle} doesn't exist`);
        }
        if (!_bicycle.locked) {
            throw new BadRequestException(`bicycle with id: ${id_bicycle} is already reserved`);
        }

        return _bicycle;
    }

}