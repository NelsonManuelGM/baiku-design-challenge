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
        const { idUser, idLocation, idBicycle, reserveFor } = createReservationDto;
        const resultObj = {}

        const _user = await this.userService.findOne(idUser);
        const _location = await this.pickupLocationService.findOne(idLocation)

        if (!_user) {
            throw new BadRequestException(`user with id: ${idUser} doesn't exist`);
        }
        if (!_location) {
            throw new BadRequestException(`location with id: ${idLocation} doesn't exist`);
        }

        resultObj['user'] = _user
        resultObj['location'] = _location

        // or both or none of the two
        if ((idBicycle && !reserveFor) || (!idBicycle && reserveFor)) {
            throw new BadRequestException('idBicycle and reserveFor come together or none of them come');
        }
        if (reserveFor) {
            resultObj['reserveFor'] = this._validateReserveFor(reserveFor)
        }

        if (idBicycle) {
            resultObj['bicycle'] = await this._validateBicycle(idBicycle);
        }

        return resultObj
    }

    async validateUpdateDTO(updateReservationDto: UpdateReservationDto) {
        if (Object.keys(updateReservationDto).length === 0) {
            throw new BadRequestException('Update values are not defined!')
        }
        const { idLocation, idBicycle, reserveFor } = updateReservationDto;
        const resultObj = {}

        // or both or none of the two
        if ((idBicycle && !reserveFor)) {
            throw new BadRequestException("idBicycle can't come alone in order to complete the reservation");
        }
        if (reserveFor) {
            resultObj['reserveFor'] = this._validateReserveFor(reserveFor)
        }

        if (idBicycle) {
            resultObj['bicycle'] = await this._validateBicycle(idBicycle);
        }

        if (idLocation) {
            resultObj['location'] = idLocation
        }

        return resultObj
    }

    _validateReserveFor(reserveFor) {
        const _reserve_for = +new Date(reserveFor);
        const now = +new Date();

        //GET the time in hours
        let difference = Math.abs(now - _reserve_for) / 1000 / 60 / 60

        difference = new Date(difference).getHours();
        //compare if it's bigger than 24 h
        if (difference > +process.env.PRE_RESERVATION_TIME) {
            throw new BadRequestException(`reserve within 24 hour`);
        }

        return reserveFor
    }

    async _validateBicycle(idBicycle) {
        const _bicycle = await this.bicycleService.findOne(idBicycle);
        if (!_bicycle) {
            throw new BadRequestException(`bicycle with id: ${idBicycle} doesn't exist`);
        }
        if (!_bicycle.locked) {
            throw new BadRequestException(`bicycle with id: ${idBicycle} is already reserved`);
        }

        return _bicycle;
    }

}