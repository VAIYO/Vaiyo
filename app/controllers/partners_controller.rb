# frozen_string_literal: true

# BigBlueButton open source conferencing system - http://www.bigbluebutton.org/.
#
# Copyright (c) 2018 BigBlueButton Inc. and by respective authors (see below).
#
# This program is free software; you can redistribute it and/or modify it under the
# terms of the GNU Lesser General Public License as published by the Free Software
# Foundation; either version 3.0 of the License, or (at your option) any later
# version.
#
# BigBlueButton is distributed in the hope that it will be useful, but WITHOUT ANY
# WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
# PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.
#
# You should have received a copy of the GNU Lesser General Public License along
# with BigBlueButton; if not, see <http://www.gnu.org/licenses/>.

class PartnersController < ApplicationController
    include Pagy::Backend
    include Registrar

    # GET /
    def index
        @partners = Partner.all
        @pagy = pagy(Partner.all)

        render ("admins/partners/partner_index")
    end

    # render view of create partner
    def create
        render ("admins/partners/create") 
    end

    # store partner
    def store
        if params[:partner][:logo].blank? && params[:partner][:name].blank?
            redirect_to admin_partners_create_path, flash: { alert: "Logo, Partner Name are required fields" }
        else
            partner = Partner.new(
                name: params[:partner][:name],
                logo: params[:partner][:logo],
                replacement_logo: params[:partner][:replacement_logo],
                status: params[:partner][:status]
            ).save

            redirect_to admin_partners_index_path, flash: { success: t('partner.table.created') }
        end
    end

    # render view of update partner
    def edit
        @partner = Partner.where(:id => params[:partner_id]).first

        render ('admins/partners/edit')
    end

    # update partner
    def update
        if params[:partner][:name].blank?
            redirect_to admin_partners_edit_path, flash: { alert: "Partner Name is required fields" }
        else
            @edit_partner = Partner.find_by(id: params['partner_id'])

            @partner = Hash.new
            @partner['name'] = params[:partner][:name]
            @partner['logo'] = (params[:partner][:logo].blank?) ? @edit_partner.logo_identifier : params[:partner][:logo]
            @partner['replacement_logo'] = (params[:partner][:replacement_logo].blank?) ? @edit_partner.replacement_logo_identifier : params[:partner][:replacement_logo]
            @partner['status'] = params[:partner][:status]

            if Partner.find_or_initialize_by(:id => params[:partner_id]).update_attributes(@partner)
                redirect_to admin_partners_index_path, flash: { success: t('partner.table.updated') }
            end
        end
    end

    # delete partner
    def destroy
        if Partner.find(params[:partner_id]).destroy
            redirect_to admin_partners_index_path, flash: { success: t('partner.table.deleted') }
        end
    end
end
